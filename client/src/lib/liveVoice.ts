/**
 * Gemini Live API 실시간 음성 대화.
 *
 * 기존 대화는 "쓰고 → 보내고 → 답을 받는" 왕복이라 말할 기회가 없다.
 * 여기서는 마이크를 열어 두고 상대가 바로 대꾸한다. 실제 카페에서 주문할 때처럼
 * 끊기지 않는 흐름을 연습하는 게 목적이다.
 *
 * 프로토콜 (v1beta BidiGenerateContent, WebSocket)
 *  - 접속하면 먼저 setup 을 한 번 보내고 setupComplete 를 기다린다.
 *  - 입력 오디오는 16kHz / 16bit / 리틀엔디언 PCM 을 base64 로 실어 보낸다.
 *  - 출력 오디오는 24kHz PCM 으로 조각조각 온다. 받는 대로 큐에 이어 붙인다.
 *  - inputAudioTranscription / outputAudioTranscription 을 켜면 양쪽 말이
 *    텍스트로도 와서 자막을 만들 수 있다.
 *
 * 이 모델은 preview 다. 언젠가 예고 없이 사라질 수 있고, 그때는 연결이 404 로
 * 끊긴다. 그래서 실패를 삼키지 않고 onError 로 올려 화면에 그대로 보여 준다.
 */

const LIVE_MODEL = "models/gemini-3.1-flash-live-preview";
const LIVE_URL =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

/** Live API 가 요구하는 입력 샘플레이트. 기기 마이크 rate 에서 여기로 낮춘다. */
const INPUT_RATE = 16000;
/** 모델이 돌려주는 오디오 샘플레이트. 고정값이다. */
const OUTPUT_RATE = 24000;

export type LiveStatus =
  | "connecting"
  | "listening"
  | "speaking"
  | "closed"
  | "error";

export type LiveHandlers = {
  onStatus: (status: LiveStatus) => void;
  /** 자막 (아직 말하는 중일 수도 있다) */
  onCaption: (side: "me" | "partner", text: string) => void;
  /** 한 턴이 끝났을 때 확정된 문장 */
  onTurn: (me: string, partner: string) => void;
  onError: (message: string) => void;
};

export type LiveHandle = { stop: () => void };

type AudioCtor = typeof AudioContext;

function audioContextCtor(): AudioCtor | null {
  const w = window as unknown as {
    AudioContext?: AudioCtor;
    webkitAudioContext?: AudioCtor;
  };
  return w.AudioContext ?? w.webkitAudioContext ?? null;
}

/** 이 기기에서 실시간 음성 대화가 가능한지. */
export function canLiveVoice() {
  return Boolean(
    audioContextCtor() &&
      typeof WebSocket !== "undefined" &&
      navigator.mediaDevices?.getUserMedia
  );
}

/** 기기 샘플레이트(보통 44.1k·48k)에서 16k 로 낮춘다. 구간 평균으로 깎는다. */
function downsample(input: Float32Array, from: number, to: number) {
  if (from <= to) return input;
  const ratio = from / to;
  const out = new Float32Array(Math.floor(input.length / ratio));
  for (let i = 0; i < out.length; i += 1) {
    const start = Math.floor(i * ratio);
    const end = Math.min(input.length, Math.floor((i + 1) * ratio));
    let sum = 0;
    for (let j = start; j < end; j += 1) sum += input[j];
    out[i] = sum / Math.max(1, end - start);
  }
  return out;
}

function encodePcm16(samples: Float32Array) {
  const buffer = new ArrayBuffer(samples.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < samples.length; i += 1) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(i * 2, clamped * 0x7fff, true);
  }
  return buffer;
}

function toBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  // 한 번에 넘기면 인자 수 제한에 걸린다. 32KB 씩 끊는다.
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

function fromBase64(data: string) {
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export async function startLiveVoice({
  key,
  instruction,
  handlers,
}: {
  key: string;
  instruction: string;
  handlers: LiveHandlers;
}): Promise<LiveHandle> {
  const Ctor = audioContextCtor();
  if (!Ctor) throw new Error("이 기기에서는 오디오를 다룰 수 없어요.");

  handlers.onStatus("connecting");

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      channelCount: 1,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  const ctx = new Ctor();
  // iOS 는 사용자 제스처 뒤에도 suspended 로 시작할 수 있다.
  if (ctx.state === "suspended") await ctx.resume();

  const source = ctx.createMediaStreamSource(stream);
  // ScriptProcessor 는 deprecated 지만 AudioWorklet 은 별도 모듈 로딩이 필요하고
  // WKWebView 에서 blob: 워크릿이 막히는 경우가 있어 여기서는 이쪽이 안전하다.
  const processor = ctx.createScriptProcessor(4096, 1, 1);
  // 콜백이 돌게 하려면 출력에 연결돼 있어야 하는데, 그대로 이으면 내 목소리가
  // 스피커로 되돌아 나온다. 게인 0 을 사이에 끼워 소리는 죽이고 그래프만 잇는다.
  const mute = ctx.createGain();
  mute.gain.value = 0;

  let closed = false;
  let playHead = 0;
  const playing = new Set<AudioBufferSourceNode>();
  let myLine = "";
  let partnerLine = "";

  const ws = new WebSocket(`${LIVE_URL}?key=${encodeURIComponent(key)}`);

  const cleanup = () => {
    if (closed) return;
    closed = true;
    for (const node of playing) {
      try {
        node.stop();
      } catch {
        // 이미 끝난 노드
      }
    }
    playing.clear();
    processor.disconnect();
    mute.disconnect();
    source.disconnect();
    stream.getTracks().forEach(track => track.stop());
    void ctx.close();
    if (
      ws.readyState === WebSocket.OPEN ||
      ws.readyState === WebSocket.CONNECTING
    )
      ws.close();
    handlers.onStatus("closed");
  };

  /** 모델이 말을 시작하면 이전에 예약된 소리를 버린다(끼어들기). */
  const flushPlayback = () => {
    for (const node of playing) {
      try {
        node.stop();
      } catch {
        // 이미 끝난 노드
      }
    }
    playing.clear();
    playHead = 0;
  };

  const playChunk = (base64: string) => {
    const bytes = fromBase64(base64);
    const view = new DataView(bytes.buffer);
    const count = Math.floor(bytes.length / 2);
    if (count === 0) return;
    // 24kHz 로 버퍼를 만들면 재생할 때 브라우저가 알아서 기기 rate 로 맞춘다.
    const buffer = ctx.createBuffer(1, count, OUTPUT_RATE);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < count; i += 1) {
      channel[i] = view.getInt16(i * 2, true) / 0x8000;
    }
    const node = ctx.createBufferSource();
    node.buffer = buffer;
    node.connect(ctx.destination);
    // 조각이 끊겨 들리지 않도록 앞 조각이 끝나는 시점에 이어 붙인다.
    playHead = Math.max(playHead, ctx.currentTime + 0.06);
    node.start(playHead);
    playHead += buffer.duration;
    playing.add(node);
    node.onended = () => playing.delete(node);
  };

  ws.onopen = () => {
    ws.send(
      JSON.stringify({
        setup: {
          model: LIVE_MODEL,
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
            },
          },
          systemInstruction: { parts: [{ text: instruction }] },
          // 양쪽 말을 텍스트로도 받아 자막을 만든다.
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
      })
    );
  };

  ws.onmessage = async event => {
    if (closed) return;
    let message: Record<string, never>;
    try {
      const raw =
        typeof event.data === "string"
          ? event.data
          : await (event.data as Blob).text();
      message = JSON.parse(raw);
    } catch {
      return;
    }

    const data = message as Record<string, unknown>;

    if (data.setupComplete) {
      // 설정이 끝난 뒤부터 오디오를 흘려보낸다.
      processor.onaudioprocess = e => {
        if (closed || ws.readyState !== WebSocket.OPEN) return;
        const input = e.inputBuffer.getChannelData(0);
        const reduced = downsample(input, ctx.sampleRate, INPUT_RATE);
        ws.send(
          JSON.stringify({
            realtimeInput: {
              audio: {
                data: toBase64(encodePcm16(reduced)),
                mimeType: `audio/pcm;rate=${INPUT_RATE}`,
              },
            },
          })
        );
      };
      source.connect(processor);
      processor.connect(mute);
      mute.connect(ctx.destination);
      handlers.onStatus("listening");
      return;
    }

    const server = data.serverContent as
      | {
          modelTurn?: { parts?: Array<{ inlineData?: { data?: string } }> };
          inputTranscription?: { text?: string };
          outputTranscription?: { text?: string };
          turnComplete?: boolean;
          interrupted?: boolean;
        }
      | undefined;
    if (!server) {
      if (data.goAway) handlers.onError("서버가 연결을 끊었어요.");
      return;
    }

    if (server.interrupted) flushPlayback();

    if (server.inputTranscription?.text) {
      myLine += server.inputTranscription.text;
      handlers.onCaption("me", myLine);
    }
    if (server.outputTranscription?.text) {
      partnerLine += server.outputTranscription.text;
      handlers.onCaption("partner", partnerLine);
    }

    for (const part of server.modelTurn?.parts ?? []) {
      if (part.inlineData?.data) {
        handlers.onStatus("speaking");
        playChunk(part.inlineData.data);
      }
    }

    if (server.turnComplete) {
      const me = myLine.trim();
      const partner = partnerLine.trim();
      myLine = "";
      partnerLine = "";
      if (me || partner) handlers.onTurn(me, partner);
      handlers.onStatus("listening");
    }
  };

  // onerror 는 이유를 알려 주지 않는다. 바로 뒤에 오는 onclose 가 서버가 보낸
  // 사유(잘못된 키, 사라진 모델 등)를 들고 오므로 보고는 그쪽에서 한다.
  ws.onerror = () => {
    if (!closed) handlers.onStatus("error");
  };

  ws.onclose = event => {
    if (closed) return;
    // 정상 종료(1000)가 아니면 이유를 그대로 보여 준다.
    // preview 모델이 사라지면 여기로 들어온다.
    if (event.code !== 1000) {
      handlers.onStatus("error");
      handlers.onError(
        event.reason
          ? `실시간 음성이 끊겼어요: ${event.reason}`
          : "실시간 음성에 연결하지 못했어요. 키와 네트워크를 확인해 주세요."
      );
    }
    cleanup();
  };

  return { stop: cleanup };
}

import AVFoundation
import Capacitor
import Foundation

/// 네이티브 음성 합성(AVSpeechSynthesizer).
///
/// 왜 필요한가: WKWebView 의 `speechSynthesis` 는 iOS 가 가진 목소리를 다 넘겨주지
/// 않는다. 사용자가 설정에서 고품질(enhanced/premium) 목소리를 내려받아도 웹 쪽
/// 목록에는 나타나지 않고, 대신 Albert·Zarvox 같은 옛 노벨티 목소리만 잔뜩 보인다.
/// 그래서 읽어 주는 소리가 딱딱했다. AVSpeechSynthesizer 는 내려받은 목소리를
/// 그대로 쓸 수 있어서 여기로 우회한다.
///
/// JS 쪽 정의는 앱의 `client/src/lib/nativeTts.ts` 에서 registerPlugin 으로 만든다.
@objc(NativeTtsPlugin)
public class NativeTtsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NativeTtsPlugin"
    public let jsName = "NativeTts"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "voices", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "speak", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise)
    ]

    private let synthesizer = AVSpeechSynthesizer()

    // MARK: - 목록

    @objc func voices(_ call: CAPPluginCall) {
        let language = call.getString("language") ?? "en-US"
        let prefix = String(language.prefix(2)).lowercased()
        let list = AVSpeechSynthesisVoice.speechVoices()
            .filter { $0.language.lowercased().hasPrefix(prefix) }
            .map { voice in
                [
                    "id": voice.identifier,
                    "name": voice.name,
                    "lang": voice.language,
                    "quality": Self.qualityName(voice),
                    "rank": Self.rank(voice, target: language.lowercased())
                ] as [String: Any]
            }
            .sorted { ($0["rank"] as? Int ?? 0) > ($1["rank"] as? Int ?? 0) }
        call.resolve(["voices": list])
    }

    private static func qualityName(_ voice: AVSpeechSynthesisVoice) -> String {
        if #available(iOS 16.0, *), voice.quality == .premium { return "premium" }
        if voice.quality == .enhanced { return "enhanced" }
        return "default"
    }

    /// 같은 언어라면 premium > enhanced > 기본 순. 지역까지 맞으면 더 높게.
    private static func rank(_ voice: AVSpeechSynthesisVoice, target: String) -> Int {
        var score = voice.language.lowercased() == target ? 100 : 40
        switch Self.qualityName(voice) {
        case "premium": score += 30
        case "enhanced": score += 20
        default: break
        }
        // 노벨티 목소리(Albert, Zarvox 등)는 식별자에 speech.synthesis.voice 가 붙는다.
        // 학습용으로는 쓸 데가 없으니 뒤로 보낸다.
        if voice.identifier.contains("speech.synthesis.voice") { score -= 80 }
        return score
    }

    // MARK: - 재생

    @objc func speak(_ call: CAPPluginCall) {
        guard let text = call.getString("text"), !text.isEmpty else {
            call.reject("읽을 문장이 없습니다.")
            return
        }
        let language = call.getString("language") ?? "en-US"
        let rate = call.getFloat("rate") ?? 1.0
        let voiceId = call.getString("voiceId")

        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            self.synthesizer.stopSpeaking(at: .immediate)

            // 발음 인식을 쓴 직후에는 오디오 세션이 녹음 모드로 잡혀 있어 소리가
            // 나오지 않는다. 재생 전에 매번 되돌린다.
            let session = AVAudioSession.sharedInstance()
            try? session.setCategory(.playback, mode: .spokenAudio, options: [.duckOthers])
            try? session.setActive(true)

            let utterance = AVSpeechUtterance(string: text)
            // 골라 둔 목소리라도 지역이 다르면 쓰지 않는다. 미국 목소리로
            // 호주식을 읽어 주면 호주식으로 바꾼 의미가 없다.
            if let voiceId,
               let voice = AVSpeechSynthesisVoice(identifier: voiceId),
               voice.language.lowercased() == language.lowercased() {
                utterance.voice = voice
            } else {
                utterance.voice = Self.bestVoice(for: language)
            }
            // 웹 표준(1.0 = 보통)을 AVSpeechUtterance 눈금으로 옮긴다.
            utterance.rate = min(
                AVSpeechUtteranceMaximumSpeechRate,
                max(
                    AVSpeechUtteranceMinimumSpeechRate,
                    AVSpeechUtteranceDefaultSpeechRate * rate
                )
            )
            utterance.pitchMultiplier = 1.0
            utterance.postUtteranceDelay = 0
            self.synthesizer.speak(utterance)
            call.resolve()
        }
    }

    private static func bestVoice(for language: String) -> AVSpeechSynthesisVoice? {
        let target = language.lowercased()
        let prefix = String(target.prefix(2))
        let all = AVSpeechSynthesisVoice.speechVoices()
            .filter { $0.language.lowercased().hasPrefix(prefix) }
        // 지역이 정확히 맞는 목소리가 하나라도 있으면 그 안에서만 고른다.
        // 품질 점수를 그냥 비교하면 en-US 고품질이 en-AU 기본을 이겨서
        // 호주식을 미국 목소리로 읽어 버린다.
        let exact = all.filter { $0.language.lowercased() == target }
        let pool = exact.isEmpty ? all : exact
        let best = pool.max { rank($0, target: target) < rank($1, target: target) }
        return best ?? AVSpeechSynthesisVoice(language: language)
    }

    @objc func stop(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            self?.synthesizer.stopSpeaking(at: .immediate)
            call.resolve()
        }
    }
}

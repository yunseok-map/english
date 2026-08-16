import AVFoundation
import Capacitor
import Foundation
import Speech

/// WKWebView 에는 webkitSpeechRecognition 이 없어서 네이티브 앱에서는 말하기 기능이 통째로 죽는다.
/// SFSpeechRecognizer 를 감싸 최소한의 인터페이스만 노출한다.
///
/// JS 쪽 정의는 앱의 `client/src/lib/nativeSpeech.ts` 에서 registerPlugin 으로 직접 만든다.
/// (플러그인 패키지는 네이티브 코드만 제공한다)
@objc(SpeechRecognitionPlugin)
public class SpeechRecognitionPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SpeechRecognitionPlugin"
    public let jsName = "SpeechRecognition"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "available", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "start", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stop", returnType: CAPPluginReturnPromise)
    ]

    private let audioEngine = AVAudioEngine()
    private var recognizer: SFSpeechRecognizer?
    private var request: SFSpeechAudioBufferRecognitionRequest?
    private var task: SFSpeechRecognitionTask?

    /// start() 의 호출을 붙잡아 두었다가 최종 결과가 나오면 한 번만 resolve 한다.
    private var pendingCall: CAPPluginCall?
    private var transcript = ""

    // MARK: - 조회

    @objc func available(_ call: CAPPluginCall) {
        let identifier = call.getString("language") ?? "en-US"
        let recognizer = SFSpeechRecognizer(locale: Locale(identifier: identifier))
        call.resolve([
            "available": recognizer?.isAvailable ?? false,
            "onDevice": recognizer?.supportsOnDeviceRecognition ?? false
        ])
    }

    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        call.resolve(["speechRecognition": Self.permissionState()])
    }

    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        SFSpeechRecognizer.requestAuthorization { _ in
            AVAudioSession.sharedInstance().requestRecordPermission { _ in
                DispatchQueue.main.async {
                    call.resolve(["speechRecognition": Self.permissionState()])
                }
            }
        }
    }

    private static func permissionState() -> String {
        let speech = SFSpeechRecognizer.authorizationStatus()
        let mic = AVAudioSession.sharedInstance().recordPermission
        if speech == .authorized && mic == .granted { return "granted" }
        if speech == .denied || speech == .restricted || mic == .denied { return "denied" }
        return "prompt"
    }

    // MARK: - 인식

    @objc func start(_ call: CAPPluginCall) {
        guard Self.permissionState() == "granted" else {
            call.reject("음성 인식 권한이 없습니다.", "unauthorized")
            return
        }

        let identifier = call.getString("language") ?? "en-US"
        let partial = call.getBool("partialResults") ?? true
        // 온디바이스 인식은 오프라인에서 돌지만 언어 모델이 내려받아져 있어야 한다.
        // 지원하지 않으면 조용히 서버 인식으로 넘어간다.
        let preferOnDevice = call.getBool("onDevice") ?? false

        DispatchQueue.main.async { [weak self] in
            guard let self else { return }
            self.teardown(resolveWith: nil)

            guard let recognizer = SFSpeechRecognizer(locale: Locale(identifier: identifier)), recognizer.isAvailable else {
                call.reject("이 기기에서 \(identifier) 음성 인식을 쓸 수 없습니다.", "unavailable")
                return
            }
            self.recognizer = recognizer

            let request = SFSpeechAudioBufferRecognitionRequest()
            request.shouldReportPartialResults = partial
            if preferOnDevice && recognizer.supportsOnDeviceRecognition {
                request.requiresOnDeviceRecognition = true
            }
            self.request = request
            self.transcript = ""
            self.pendingCall = call
            call.keepAlive = true

            do {
                let session = AVAudioSession.sharedInstance()
                try session.setCategory(.record, mode: .measurement, options: .duckOthers)
                try session.setActive(true, options: .notifyOthersOnDeactivation)
            } catch {
                self.finish(error: "마이크를 준비하지 못했습니다.")
                return
            }

            let input = self.audioEngine.inputNode
            let format = input.outputFormat(forBus: 0)
            input.removeTap(onBus: 0)
            input.installTap(onBus: 0, bufferSize: 1024, format: format) { buffer, _ in
                request.append(buffer)
            }

            self.audioEngine.prepare()
            do {
                try self.audioEngine.start()
            } catch {
                self.finish(error: "녹음을 시작하지 못했습니다.")
                return
            }

            self.task = recognizer.recognitionTask(with: request) { [weak self] result, error in
                guard let self else { return }
                if let result {
                    self.transcript = result.bestTranscription.formattedString
                    if partial && !result.isFinal {
                        self.notifyListeners("partialResult", data: ["value": self.transcript])
                    }
                    if result.isFinal {
                        self.finish(error: nil)
                        return
                    }
                }
                if error != nil {
                    // 사용자가 말을 멈춰서 끝난 경우도 error 로 온다.
                    // 이미 받아 둔 텍스트가 있으면 성공으로 처리한다.
                    self.finish(error: self.transcript.isEmpty ? "인식하지 못했어요. 다시 말해 볼까요?" : nil)
                }
            }
        }
    }

    @objc func stop(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            // 남은 오디오까지 처리되도록 엔진만 먼저 멈춘다.
            // 최종 결과는 recognitionTask 콜백에서 start() 의 call 로 resolve 된다.
            self?.request?.endAudio()
            self?.audioEngine.stop()
            self?.audioEngine.inputNode.removeTap(onBus: 0)
            call.resolve()
        }
    }

    // MARK: - 정리

    /// pendingCall 을 정확히 한 번만 매듭짓는다.
    private func finish(error: String?) {
        let call = pendingCall
        pendingCall = nil
        let text = transcript
        teardown(resolveWith: nil)
        guard let call else { return }
        call.keepAlive = false
        if let error {
            call.reject(error, "no-match")
        } else {
            call.resolve(["value": text])
        }
    }

    private func teardown(resolveWith _: String?) {
        if audioEngine.isRunning {
            audioEngine.stop()
            audioEngine.inputNode.removeTap(onBus: 0)
        }
        task?.cancel()
        task = nil
        request = nil
        recognizer = nil
        try? AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
    }
}

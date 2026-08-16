import { CapacitorHttp } from "@capacitor/core";
import { isNative } from "@/lib/native";

/**
 * CORS 를 열어 두지 않은 API 를 부르기 위한 얇은 래퍼.
 *
 * DeepL·Papago 는 응답에 Access-Control-Allow-Origin 을 주지 않는다.
 * 브라우저에서 fetch 로 부르면 Authorization 헤더 때문에 프리플라이트가
 * 먼저 나가고, 거기서 막혀 요청 자체가 실패한다.
 * 앱(WKWebView)에서는 CapacitorHttp 가 네이티브로 요청을 보내므로 CORS 가
 * 적용되지 않는다. 웹에서는 어쩔 수 없이 fetch 를 쓰고, 실패하면 호출한
 * 쪽에서 예비 엔진으로 넘어간다.
 */
export async function postJson(
  url: string,
  headers: Record<string, string>,
  body: string | Record<string, string>,
  form = false
): Promise<unknown> {
  const payload =
    typeof body === "string" ? body : new URLSearchParams(body).toString();

  if (isNative) {
    const response = await CapacitorHttp.post({
      url,
      headers: {
        "Content-Type": form
          ? "application/x-www-form-urlencoded"
          : "application/json",
        ...headers,
      },
      data: payload,
    });
    if (response.status >= 400) throw new Error(`HTTP ${response.status}`);
    // CapacitorHttp 는 JSON 이면 객체로, 아니면 문자열로 돌려준다.
    return typeof response.data === "string"
      ? safeParse(response.data)
      : response.data;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": form
        ? "application/x-www-form-urlencoded"
        : "application/json",
      ...headers,
    },
    body: payload,
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function safeParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

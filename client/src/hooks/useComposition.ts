import * as React from "react";
import { useRef } from "react";

type CompositionHandlers<T extends HTMLElement> = {
  onKeyDown?: (e: React.KeyboardEvent<T>) => void;
  onCompositionStart?: (e: React.CompositionEvent<T>) => void;
  onCompositionEnd?: (e: React.CompositionEvent<T>) => void;
};

/**
 * CJK IME 지원: 한글 조합 중 Enter가 확정 동작으로 오인되지 않도록
 * composition 상태를 추적해 keydown 핸들러를 감싼다.
 */
export function useComposition<T extends HTMLElement>({
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
}: CompositionHandlers<T>) {
  const composing = useRef(false);

  return {
    onCompositionStart: (e: React.CompositionEvent<T>) => {
      composing.current = true;
      onCompositionStart?.(e);
    },
    onCompositionEnd: (e: React.CompositionEvent<T>) => {
      composing.current = false;
      onCompositionEnd?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent<T>) => {
      if (
        e.key === "Enter" &&
        (composing.current || (e.nativeEvent as KeyboardEvent).isComposing)
      ) {
        return;
      }
      onKeyDown?.(e);
    },
  };
}

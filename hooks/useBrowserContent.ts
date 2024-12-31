"use client";

import { useState, useRef, useCallback } from "react";

export function useBrowserContent() {
  const [browser, setBrowser] = useState(false);
  const [padding, setPadding] = useState(false);
  const paddingRef = useRef<HTMLDivElement>(null);

  const toggleBrowser = useCallback(() => setBrowser((prev) => !prev), []);
  const togglePadding = useCallback(() => {
    setPadding((prev) => !prev);
    if (!padding) {
      setTimeout(() => {
        paddingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [padding]);

  return {
    browser,
    padding,
    paddingRef,
    toggleBrowser,
    togglePadding,
  };
}

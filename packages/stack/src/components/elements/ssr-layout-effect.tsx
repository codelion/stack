"use client";
import { useLayoutEffect } from "react";

export function SsrScript(props: { script: string, nonce?: string }) {
  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.text = props.script;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

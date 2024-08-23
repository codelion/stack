"use client";
import { useLayoutEffect } from "react";

export function SsrScript(props: { script: string, nonce?: string }) {
  useLayoutEffect(() => {
    // Implementing an alternative to eval
    const script = document.createElement('script');
    script.textContent = props.script;
    document.body.appendChild(script);
  }, []);

  return (
    <script
      suppressHydrationWarning
      nonce={props.nonce}
    />
  );
}
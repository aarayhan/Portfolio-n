"use client";

import { useState } from "react";

export function CopyButton({ text, labels }: { text: string; labels: { copy: string; copied: string } }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-md border border-line-dark px-2.5 py-1 text-xs text-muted-dark transition-colors hover:text-bone"
    >
      {copied ? labels.copied : labels.copy}
    </button>
  );
}

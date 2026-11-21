"use client";

import { useState } from "react";

type EmailCardProps = {
  title: string;
  url: string; // "mailto:..." 형식
};

// mailto: 링크는 PC에 기본 메일 앱이 없으면 아무 반응이 없다.
// 그래서 클릭 시 주소를 클립보드에 복사하고 안내를 보여준 뒤 메일 앱 열기를 시도한다.
export default function EmailCard({ title, url }: EmailCardProps) {
  const address = url.replace(/^mailto:/, "");
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 4000);
    } catch {
      // 클립보드 권한이 없으면 복사는 건너뛰고 메일 앱 열기만 시도한다
    }
    window.location.href = url;
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className="block w-full cursor-pointer rounded-xl border border-black/15 bg-white px-5 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:border-white/20 dark:bg-[#0a0a0a]"
      >
        {title}
      </button>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-muted">
        {copied ? `📋 ${address} 주소를 복사했어요. 메일 앱이 안 열리면 붙여넣어 보내주세요.` : ""}
      </p>
    </div>
  );
}

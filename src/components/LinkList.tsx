"use client";

import { useEffect, useState } from "react";
import EmailCard from "@/components/EmailCard";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

// 링크 카드 목록 + 클릭 수 관리
// - 처음에는 모두 0으로 보여주고, 페이지가 열리면 /api/clicks에서 한 번에 받아와 갱신한다.
// - 카드를 누르면 화면의 숫자를 바로 1 올리고, 서버에도 +1을 보낸 뒤 서버 값으로 맞춘다.
export default function LinkList({ links }: LinkListProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { counts: Record<string, number> }) => {
        // 응답을 기다리는 동안 누른 클릭은 잃지 않도록 더 큰 값을 유지한다
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, value] of Object.entries(prev)) next[id] = Math.max(next[id] ?? 0, value);
          return next;
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error("클릭 수를 불러오지 못했습니다:", err);
      });
    return () => controller.abort();
  }, []);

  function recordClick(id: string) {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // keepalive: 페이지가 이동(메일 앱 열기 등)해도 요청이 끝까지 전송되도록 한다
    fetch(`/api/clicks/${encodeURIComponent(id)}`, { method: "POST", keepalive: true })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count: number } | null) => {
        if (data) setCounts((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, data.count) }));
      })
      .catch((err) => console.error("클릭 수를 저장하지 못했습니다:", err));
  }

  return (
    <ul className="mt-12 flex flex-col gap-4 sm:mt-14 sm:gap-5">
      {links.map((link) => {
        const count = counts[link.id] ?? 0;
        const onClick = () => recordClick(link.id);
        return (
          <li key={link.id}>
            {link.url.startsWith("mailto:") ? (
              <EmailCard title={link.title} url={link.url} count={count} onClick={onClick} />
            ) : (
              <LinkCard title={link.title} url={link.url} count={count} onClick={onClick} />
            )}
          </li>
        );
      })}
    </ul>
  );
}

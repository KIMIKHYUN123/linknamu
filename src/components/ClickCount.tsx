// 카드 오른쪽에 작게 표시되는 클릭 수 (예: "42")
export default function ClickCount({ count }: { count: number }) {
  return (
    <span
      aria-label={`클릭 ${count}회`}
      className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-muted"
    >
      {count.toLocaleString("ko-KR")}
    </span>
  );
}

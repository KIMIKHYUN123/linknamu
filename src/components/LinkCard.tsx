import ClickCount from "@/components/ClickCount";

type LinkCardProps = {
  title: string;
  url: string;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-xl border border-black/15 bg-white px-14 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground dark:border-white/20 dark:bg-[#0a0a0a]"
    >
      {title}
      <ClickCount count={count} />
    </a>
  );
}

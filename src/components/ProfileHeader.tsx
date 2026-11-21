import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 겹친 그림자로 살짝 떠 있는 입체감 */}
      <div className="rounded-full bg-gradient-to-b from-white/90 to-white/40 p-1.5 shadow-[0_2px_6px_rgba(28,58,92,0.10),0_18px_40px_-12px_rgba(28,58,92,0.35)] dark:from-white/25 dark:to-white/5">
        <Image
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          width={144}
          height={144}
          priority
          className="h-32 w-32 rounded-full object-cover sm:h-36 sm:w-36"
        />
      </div>
      <h1 className="mt-7 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted">{bio}</p>
    </header>
  );
}

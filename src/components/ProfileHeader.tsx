import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={160}
        height={160}
        priority
        className="h-40 w-40 rounded-full border border-black/10 object-cover dark:border-white/15"
      />
      <h1 className="mt-5 text-xl font-semibold">{name}</h1>
      <p className="mt-2 text-sm text-foreground/70">{bio}</p>
    </header>
  );
}

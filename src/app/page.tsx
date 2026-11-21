import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 레이아웃: 상단 원형 프로필 + 이름/소개, 아래 링크 카드 세로 배치
export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <ul className="mt-12 flex flex-col gap-5">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

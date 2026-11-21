import EmailCard from "@/components/EmailCard";
import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 레이아웃: 상단 원형 프로필 + 이름/소개, 아래 링크 카드 세로 배치
export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 pt-20 pb-16 sm:px-8 sm:pt-24">
      <div className="w-full max-w-[26rem]">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <ul className="mt-12 flex flex-col gap-4 sm:mt-14 sm:gap-5">
          {profile.links.map((link) => (
            <li key={link.id}>
              {link.url.startsWith("mailto:") ? (
                <EmailCard title={link.title} url={link.url} />
              ) : (
                <LinkCard title={link.title} url={link.url} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

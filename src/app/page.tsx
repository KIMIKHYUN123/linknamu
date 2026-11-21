import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

// wireframe.png 레이아웃: 상단 원형 프로필 + 이름/소개, 아래 링크 카드 세로 배치
export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 pt-20 pb-16 sm:px-8 sm:pt-24">
      <div className="w-full max-w-[26rem]">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <LinkList links={profile.links} />
      </div>
    </main>
  );
}

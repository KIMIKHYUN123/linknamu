export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "김익현",
  bio: "방구석 초보 개발자 | 반도체와 AI의 결합에 관심이 많아요",
  imageUrl: "/profile-room-dev.svg",
  links: [
    { id: "github", title: "🐙 GitHub", url: "https://github.com/KIMIKHYUN123" },
    { id: "instagram", title: "📸 Instagram", url: "https://www.instagram.com/aristalies" },
    { id: "email", title: "✉️ Email", url: "mailto:ighyun123@nate.com" },
  ],
};

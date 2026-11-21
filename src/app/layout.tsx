import type { Metadata } from "next";
import { Gowun_Dodum, Nunito } from "next/font/google";
import "./globals.css";

// 영문/숫자: 둥근 산세리프 Nunito (가변 굵기)
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

// 한글: 끝이 부드러운 돋움체 Gowun Dodum (한글 글리프는 unicode-range로 필요한 만큼만 로드됨)
const gowunDodum = Gowun_Dodum({
  variable: "--font-gowun",
  weight: "400",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "링크나무",
  description: "내 모든 링크를 한 페이지에",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${nunito.variable} ${gowunDodum.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

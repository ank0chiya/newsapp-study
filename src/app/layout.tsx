import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 作成したヘッダーをインポート


const inter = Inter({ subsets: ["latin"] });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "News Reader App",
  description: "A simple news reader app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"> 
      <body className={inter.className}>
        <Header /> {/* ヘッダーコンポーネントをここに追加 */}
        {children} {/* 各ページの内容がここに表示される */}
        {/* フッターなどもここに追加可能 */}
      </body>
    </html>
  );
}

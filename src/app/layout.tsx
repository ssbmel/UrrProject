import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "URR",
  description: "인플루언서와 소통하고 공구상품을 구매해보세요!",
  openGraph: {
    images: "/main.png"
  },
  icons: {
    icon: "/urrIcon.png"
  },
  metadataBase: new URL("https://urr-final.vercel.app")
} as const;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-auto ${pretendard.className} ${inter.className}`}>{children}</body>
    </html>
  );
}

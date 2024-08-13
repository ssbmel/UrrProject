import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URR(우르르)",
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
      <body className={`overflow-hidden ${inter.className}`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";

const vazirmatnSans = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "اقتصاد برای مردم | Economics for the People",
  description:
    "آموزش مفاهیم اقتصادی به زبان ساده برای همه | مقالات، تحلیل‌ها و آموزش‌های کاربردی اقتصاد به همراه اخبار و رویدادهای اقتصادی روز",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={`${vazirmatnSans.className} antialiased `}>
        <Header />
        <main className="pt-20 px-4">{children}</main>
      </body>
    </html>
  );
}

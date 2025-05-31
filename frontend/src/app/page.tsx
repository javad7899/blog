import { Metadata } from "next";
import SiteDescription from "@/components/common/site-desc";
import ArticleCarousel from "@/components/common/site-articles";

export const metadata: Metadata = {
  title: "سایت آموزش اقتصاد به زبان ساده",
  description: "یادگیری اقتصاد به زبان ساده برای عموم مردم",
  openGraph: {
    title: "سایت آموزش اقتصاد به زبان ساده",
    description: "مفاهیم اقتصادی را آسان یاد بگیرید",
    type: "website",
    url: "https://example.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "آموزش اقتصاد",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <SiteDescription />
      <ArticleCarousel />
    </div>
  );
}

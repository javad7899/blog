"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const articles = [
  {
    id: 1,
    title: "چگونه سواد اقتصادی خود را تقویت کنیم",
    description:
      "راهنمایی ساده برای شروع یادگیری مفاهیم اقتصادی از پایه تا پیشرفته",
    coverImage: "/placeholder.svg?height=600&width=1200",
    slug: "how-to-start-economics",
  },
  {
    id: 2,
    title: "بهترین منابع یادگیری اقتصاد در سال ۲۰۲۴",
    description:
      "معرفی کتاب‌ها، دوره‌ها و وب‌سایت‌های برتر برای آموزش اقتصاد کاربردی",
    coverImage: "/placeholder.svg?height=600&width=1200",
    slug: "best-economics-resources-2024",
  },
  {
    id: 3,
    title: "تأثیر هوش مصنوعی بر اقتصاد جهانی",
    description:
      "بررسی فرصت‌ها و چالش‌های اقتصادی ناشی از پیشرفت‌های هوش مصنوعی",
    coverImage: "/placeholder.svg?height=600&width=1200",
    slug: "ai-and-global-economy",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row w-full">
      {/* Site Description */}
      <div className="w-full md:w-1/3 p-6">
        <h1 className="text-2xl font-bold mb-4">درباره ما</h1>
        <p className="text-base leading-relaxed">
          ما در این وب‌سایت تلاش می‌کنیم مفاهیم اقتصادی را به زبان ساده برای
          عموم مردم قابل‌فهم کنیم. اگر به دنبال افزایش سواد اقتصادی خود هستید،
          اینجا نقطه شروع مناسبی است.
        </p>
      </div>

      {/* Swiper Slider */}
      <div className="relative w-full md:w-2/3 overflow-hidden rounded-xl bg-background shadow-lg">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          autoplay={{ delay: 5000 }}
          navigation
          pagination={{ clickable: true }}
          dir="rtl"
          className="h-[300px] md:h-[400px]"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
              <div className="relative h-full w-full">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-20">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm md:text-base mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <Link href={`/articles/${article.slug}`}>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white/20 hover:text-white"
                    >
                      ادامه مطلب
                    </Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

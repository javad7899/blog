"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: {
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
    };
  };
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
};

export default function ArticleCarousel() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[is_featured][$eq]=true&populate=*`
        );
        const json = await res.json();
        const formatted = json.data.map((article: any) => ({
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          cover_image: {
            url:
              article.cover_image?.formats?.medium?.url ||
              article.cover_image?.url ||
              "/placeholder.svg",
          },
          categories:
            article.categories?.map((cat: any) => ({
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
            })) || [],
        }));
        setArticles(formatted);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="relative w-full md:w-4/5 max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center p-4">
      <Carousel
        opts={{
          align: "center",
          loop: true,
          direction: "rtl",
        }}
        className="w-full overflow-hidden"
      >
        <CarouselContent className="flex">
          {articles.map((article) => (
            <CarouselItem key={article.id} className="w-full flex-shrink-0">
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${article.cover_image.url}`}
                  alt={article.title}
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-20">
                  <h2 className="text-xl md:text-2xl font-bold mb-2">
                    {article.title}
                  </h2>

                  {article.categories && article.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/categories/${cat.slug}`}
                          className="text-xs bg-amber-600 text-white px-3 py-1 rounded-full hover:bg-amber-700 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}

                  <p className="text-sm md:text-base mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <Link href={`/articles/${article.slug}`}>
                    <Button className="cursor-pointer border-white text-white hover:bg-white/20">
                      ادامه مطلب
                    </Button>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 right-auto cursor-pointer" />
        <CarouselNext className="right-4 left-auto cursor-pointer" />
      </Carousel>
    </div>
  );
}

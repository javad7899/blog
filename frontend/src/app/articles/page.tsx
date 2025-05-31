// app/articles/page.tsx
import { notFound } from "next/navigation";
import ArticlesList from "./articles-list";
import { Metadata } from "next";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  cover_image: {
    url: string;
  };
  published_date: string;
  publishedAt: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  slug: string;
  is_featured?: boolean;
}

interface ApiResponse {
  data: Article[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "آخرین مقالات | وبلاگ ما",
    description: "جدیدترین مقالات، آموزش‌ها و مطالب وبلاگ ما را بخوانید.",
    openGraph: {
      title: "آخرین مقالات | وبلاگ ما",
      description: "با جدیدترین پست‌ها و مطالب ویژه همراه باشید.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles`,
      siteName: "وبلاگ ما",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/default-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "تصویر شاخص وبلاگ",
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
  };
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const pageSize = 6;

  let articles: Article[] = [];
  let pagination: ApiResponse["meta"]["pagination"] | null = null;
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
      { next: { revalidate: 0 } }
    );

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(
        responseData?.error?.message || "Failed to fetch articles"
      );
    }

    articles = responseData.data;
    pagination = responseData.meta.pagination;

    if (pagination && (page > pagination.pageCount || page < 1)) {
      notFound(); // trigger 404 page
    }
  } catch (err: any) {
    error = err.message;
  }

  return (
    <ArticlesList articles={articles} pagination={pagination} error={error} />
  );
}

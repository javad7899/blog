"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  AlertCircle,
  FileText,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import RetryButton from "@/components/common/retry-button";

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

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Props {
  articles: Article[];
  pagination: Pagination | null;
  error: string | null;
}

export default function ArticlesList({ articles, pagination, error }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FileText className="w-4 h-4" />
            <h1 className="text-xl">مجموعه مقالات</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            مجموعه‌ای منتخب از مقالات خواندنی و الهام‌بخش را کشف کنید و از
            تجربیات ارزشمند بهره‌مند شوید
          </p>
        </div>

        {error ? (
          <div className="max-w-md mx-auto">
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-semibold text-red-800 mb-4">
                  بارگذاری مقالات با خطا مواجه شد
                </h2>
                <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
                <RetryButton />
              </CardContent>
            </Card>
          </div>
        ) : articles.length === 0 ? (
          <div className="max-w-md mx-auto">
            <Card className="border-slate-200 bg-slate-50/50">
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-slate-600" />
                </div>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                  مقاله‌ای یافت نشد
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  در حال حاضر مقاله‌ای برای نمایش وجود ندارد. لطفاً بعداً دوباره
                  بررسی کنید.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 mb-16">
              {articles.map((article, index) => (
                <Card
                  key={article.id}
                  className="group flex flex-col justify-between overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
                >
                  {/* Image Container */}
                  {article.cover_image && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${article.cover_image.url}`}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Featured Badge */}
                      {article.is_featured && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            ویژه
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  <CardHeader className="space-y-4 pb-4">
                    {/* Categories */}
                    <div className="flex gap-2 flex-wrap">
                      {article.categories.slice(0, 2).map((category) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="group/category"
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs cursor-pointer bg-slate-100 hover:bg-primary hover:text-white transition-colors duration-200 group-hover/category:scale-105"
                          >
                            {category.name}
                          </Badge>
                        </Link>
                      ))}
                      {article.categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.categories.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="space-y-4 text-muted-foreground flex-grow pb-4">
                    <p className="line-clamp-3 leading-relaxed text-sm">
                      {article.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto flex justify-between items-center pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="font-medium">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Link
                        href={`/articles/${article.slug}`}
                        className="flex items-center gap-2"
                      >
                        ادامه مطلب
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {pagination && pagination.pageCount > 1 && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  {pagination.page > 1 ? (
                    <Button
                      variant="outline"
                      asChild
                      className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      <Link href={`/articles?page=${pagination.page - 1}`}>
                        <ChevronRight className="w-4 h-4" />
                        قبلی
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      disabled
                      className="flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      قبلی
                    </Button>
                  )}

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 mx-4">
                    {Array.from(
                      { length: Math.min(5, pagination.pageCount) },
                      (_, i) => {
                        let pageNum;
                        if (pagination.pageCount <= 5) {
                          pageNum = i + 1;
                        } else if (pagination.page <= 3) {
                          pageNum = i + 1;
                        } else if (
                          pagination.page >=
                          pagination.pageCount - 2
                        ) {
                          pageNum = pagination.pageCount - 4 + i;
                        } else {
                          pageNum = pagination.page - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={
                              pageNum === pagination.page
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            asChild
                            className={`w-10 h-10 ${
                              pageNum === pagination.page
                                ? "bg-primary text-white shadow-lg"
                                : "hover:bg-primary hover:text-white"
                            } transition-colors duration-200`}
                          >
                            <Link href={`/articles?page=${pageNum}`}>
                              {pageNum}
                            </Link>
                          </Button>
                        );
                      }
                    )}
                  </div>

                  {/* Next Button */}
                  {pagination.page < pagination.pageCount ? (
                    <Button
                      variant="outline"
                      asChild
                      className="flex items-center gap-2 hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      <Link href={`/articles?page=${pagination.page + 1}`}>
                        بعدی
                        <ChevronLeft className="w-4 h-4" />
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      disabled
                      className="flex items-center gap-2"
                    >
                      بعدی
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Page Info */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    صفحه{" "}
                    <span className="font-semibold text-primary">
                      {pagination.page}
                    </span>{" "}
                    از{" "}
                    <span className="font-semibold">
                      {pagination.pageCount}
                    </span>{" "}
                    • مجموع{" "}
                    <span className="font-semibold">{pagination.total}</span>{" "}
                    مقاله
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

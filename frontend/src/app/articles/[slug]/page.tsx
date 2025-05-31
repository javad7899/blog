import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface ArticleData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  cover_image?: {
    url: string;
    formats?: {
      medium?: { url: string };
    };
  };
  categories?: {
    name: string;
    slug: string;
  }[];
}

async function getArticleBySlug(slug: string): Promise<ArticleData | null> {
  const res = await fetch(
    `http://localhost:8080/api/posts?filters[slug][$eq]=${slug}&populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch article");

  const json = await res.json();
  return json.data?.[0] || null;
}

// Function to estimate reading time
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// ✅ Add SEO metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);

  if (!article?.seo) return { title: "مقاله یافت نشد" };

  return {
    title: article.seo.metaTitle || article.title,
    description: article.seo.metaDescription || article.excerpt,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      images: [
        {
          url: `http://localhost:8080${article.cover_image?.url}`,
          width: 800,
          height: 420,
          alt: article.title,
        },
      ],
    },
  };
}

const ArticleDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const article = await getArticleBySlug(params.slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <h2 className="text-xl font-semibold">مقاله یافت نشد</h2>
              <p className="text-muted-foreground">
                متأسفانه مقاله‌ای با این عنوان در دسترس نیست.
              </p>
              <Button asChild>
                <Link href="/articles">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  بازگشت به مقالات
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const coverUrl =
    article.cover_image?.formats?.medium?.url || article.cover_image?.url;

  const readingTime = estimateReadingTime(article.content);
  const publishDate = new Date(article.publishedAt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Navigation */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild className="mb-2">
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              بازگشت به مقالات
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-8 px-4 space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          {/* Categories */}
          {article.categories && article.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.categories.map((cat) => (
                <Badge key={cat.slug} variant="secondary" className="text-xs">
                  {cat.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <time dateTime={article.publishedAt}>
                {publishDate.toLocaleDateString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} دقیقه مطالعه</span>
            </div>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
        </div>

        {/* Cover Image */}
        {coverUrl && (
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={`http://localhost:8080${coverUrl}`}
              alt={article.title}
              width={1200}
              height={600}
              className="w-full h-[400px] md:h-[500px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Footer Actions */}
        <div className="flex justify-center pt-8">
          <Button asChild size="lg" className="shadow-lg">
            <Link href="/articles">
              <ArrowLeft className="w-4 h-4 mr-2" />
              مشاهده مقالات بیشتر
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailsPage;

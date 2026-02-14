import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPostBySlug, getAllSlugs } from "@/data/blog";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found | Coliville" };

  return {
    title: `${post.seoTitle} | Coliville`,
    description: post.metaDescription,
    keywords: post.supportingKeywords.join(", "),
    openGraph: {
      title: post.seoTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations("blog");
  const readTime = Math.max(1, Math.ceil(post.wordCount / 250));
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(
        locale === "fr" ? "fr-CA" : "en-CA",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  // JSON-LD structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Coliville",
      url: "https://coliville.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Coliville",
      url: "https://coliville.com",
    },
    mainEntityOfPage: `https://coliville.com/${locale}/blog/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://coliville.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "Blogue" : "Blog",
        item: `https://coliville.com/${locale}/${locale === "fr" ? "blogue" : "blog"}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.seoTitle,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-background">
        {/* ── Header ── */}
        <section className="px-6 pt-32 pb-8 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-secondary transition-colors">
                Coliville
              </Link>
              <span>/</span>
              <Link
                href="/blog"
                className="hover:text-secondary transition-colors"
              >
                {t("backToBlog")}
              </Link>
            </nav>

            {/* Meta row */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                {post.primaryKeyword}
              </span>
              <span className="text-text-muted">{publishDate}</span>
              <span className="text-text-muted">
                &middot; {t("minRead", { count: readTime })}
              </span>
            </div>

            {/* Title — from SEO title */}
            <h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl lg:text-5xl leading-tight">
              {post.seoTitle}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              {post.metaDescription}
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-20">
          <hr className="border-border-light" />
        </div>

        {/* ── Article Content ── */}
        <article className="px-6 py-12 sm:px-10 lg:px-20">
          <div
            className="prose mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* ── Bottom CTA ── */}
        <section className="bg-secondary">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center sm:px-10 lg:px-20">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="max-w-md text-lg text-white/70">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
              >
                {t("applyNow")}
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
              >
                &larr; {t("backToBlog")}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

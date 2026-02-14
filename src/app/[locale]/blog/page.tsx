import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts } from "@/data/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: `${t("title")} | Coliville`,
    description: t("subtitle"),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Page Header ── */}
      <section className="px-6 pt-32 pb-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* ── Blog Post Grid ── */}
      <section className="px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <p className="text-center text-lg text-text-muted py-16">
              {t("noPosts")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const readTime = Math.max(1, Math.ceil(post.wordCount / 250));
                const publishDate = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString(
                      locale === "fr" ? "fr-CA" : "en-CA",
                      { year: "numeric", month: "long", day: "numeric" }
                    )
                  : "";

                return (
                  <Link
                    key={post.slug}
                    href={{
                      pathname: "/blog/[slug]",
                      params: { slug: post.slug },
                    }}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border-light bg-card-bg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
                  >
                    {/* Color accent bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary to-accent" />

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      {/* Keyword pill + read time */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                          {post.primaryKeyword}
                        </span>
                        <span className="text-text-muted">
                          {t("minRead", { count: readTime })}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg font-semibold text-secondary leading-snug group-hover:text-primary transition-colors duration-200">
                        {post.seoTitle}
                      </h2>

                      {/* Excerpt */}
                      <p className="flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                        {post.metaDescription}
                      </p>

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between border-t border-border-light pt-4">
                        <span className="text-xs text-text-muted">
                          {publishDate}
                        </span>
                        <span className="text-sm font-medium text-primary group-hover:underline">
                          {t("readMore")} &rarr;
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="border-t border-border-light bg-secondary px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-3 max-w-md text-white/70">
            {t("ctaSubtitle")}
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-flex items-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
          >
            {t("applyNow")}
          </Link>
        </div>
      </section>
    </div>
  );
}

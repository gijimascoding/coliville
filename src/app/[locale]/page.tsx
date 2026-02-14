import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocalizedProperties } from "@/data/get-property";
import { getLowestPrice } from "@/data/properties";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const properties = getLocalizedProperties(locale);

  return (
    <div className="bg-background">
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80"
          alt="Young professionals in a modern shared workspace"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70 font-medium mb-6">
            {t("tagline")}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6">
            <span className="whitespace-nowrap">{t("headline1")}</span>
            <br />
            <span className="whitespace-nowrap text-primary-light">{t("headline2")}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/locations"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105 text-base"
            >
              {t("browseLocations")}
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/tour"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 text-base"
            >
              {t("bookTour")}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── Property Highlights Grid ─── */}
      <section id="locations" className="py-24 sm:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary tracking-tight mb-4">
              {t("findYourVibe")}
            </h2>
            <p className="text-text-muted text-lg max-w-md mx-auto">
              {t("uniqueLocations")}
            </p>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((property) => {
              const lowestPrice = getLowestPrice(property);
              return (
                <Link
                  key={property.id}
                  href={{
                    pathname: "/locations/[slug]",
                    params: { slug: property.slug },
                  }}
                  className="group block"
                >
                  <div className="bg-card-bg rounded-2xl overflow-hidden border border-border-light hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {/* Card Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={property.heroImage}
                        alt={property.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Card Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="font-semibold text-secondary text-base sm:text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                        {property.name}
                      </h3>
                      <p className="text-text-muted text-xs sm:text-sm mb-3 truncate">
                        {property.neighborhood}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-secondary">
                          From C${lowestPrice}
                          <span className="text-text-muted font-normal">
                            {t("perWeek")}
                          </span>
                        </span>
                        <svg
                          className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Value Props / How It Works ─── */}
      <section className="py-24 sm:py-32 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              {t("whyColiville")}
            </h2>
            <p className="text-white/50 text-lg max-w-md mx-auto">
              {t("whySubtitle")}
            </p>
          </div>

          {/* Value Props Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Move-in ready */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <svg className="w-7 h-7 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">{t("moveInReady")}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t("moveInReadyDesc")}</p>
            </div>

            {/* Zero hassle */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <svg className="w-7 h-7 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">{t("zeroHassle")}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t("zeroHassleDesc")}</p>
            </div>

            {/* Built for community */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <svg className="w-7 h-7 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">{t("community")}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t("communityDesc")}</p>
            </div>

            {/* Flexible terms */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group">
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                <svg className="w-7 h-7 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">{t("flexibleTerms")}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t("flexibleTermsDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social Proof / Testimonials ─── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary tracking-tight mb-4">
              {t("testimonials")}
            </h2>
            <p className="text-text-muted text-lg">{t("testimonialsSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: t("testimonial1"), name: t("testimonial1Name"), sub: t("testimonial1Sub"), initials: "SM", color: "primary" },
              { text: t("testimonial2"), name: t("testimonial2Name"), sub: t("testimonial2Sub"), initials: "JL", color: "accent" },
              { text: t("testimonial3"), name: t("testimonial3Name"), sub: t("testimonial3Sub"), initials: "AP", color: "primary" },
            ].map((testimonial, i) => (
              <div key={i} className="bg-card-bg rounded-2xl p-8 border border-border-light hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-${testimonial.color}/10 flex items-center justify-center text-${testimonial.color} font-semibold text-sm`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-secondary font-medium text-sm">{testimonial.name}</p>
                    <p className="text-text-muted text-xs">{testimonial.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-24 sm:py-32 px-6 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/locations"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-background transition-all duration-300 hover:scale-105 text-base"
            >
              {t("ctaBook")}
            </Link>
            <Link
              href="/tour"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105 text-base"
            >
              {t("ctaTour")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

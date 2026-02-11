"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  const exploreLinks = [
    { label: t("locations"), href: "/locations" as const },
    { label: t("applyNow"), href: "/apply" as const },
    { label: t("scheduleTour"), href: "/tour" as const },
  ];

  const companyLinks = [
    { label: t("about"), href: "#" },
    { label: t("contact"), href: "#" },
    { label: t("blog"), href: "#" },
  ];

  const connectLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Email", href: "mailto:hello@coliville.com" },
  ];

  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Top section: Brand + Link columns */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              coliville
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {t("tagline")}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {t("explore")}
            </h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {t("company")}
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              {t("connect")}
            </h3>
            <ul className="mt-4 space-y-3">
              {connectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                    {...(link.href.startsWith("http") ||
                    link.href.startsWith("mailto")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-500">{t("rights")}</p>
            <p className="text-xs text-gray-500">{t("location")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

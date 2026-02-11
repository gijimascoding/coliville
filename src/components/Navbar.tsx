"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("nav");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "shadow-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-0">
            <span className="text-2xl font-bold tracking-tight text-secondary">
              col
            </span>
            <span className="text-2xl font-bold tracking-tight text-primary">
              i
            </span>
            <span className="text-2xl font-bold tracking-tight text-secondary">
              ville
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {/* Nav Links */}
            <div className="flex items-center gap-6">
              <Link
                href="/locations"
                className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-secondary"
              >
                {t("locations")}
              </Link>
              <a
                href="/#about"
                className="text-sm font-medium text-text-secondary transition-colors duration-200 hover:text-secondary"
              >
                {t("about")}
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                href="/tour"
                className="rounded-full border border-secondary px-5 py-2.5 text-sm font-medium text-secondary transition-all duration-200 hover:bg-secondary hover:text-white"
              >
                {t("scheduleTour")}
              </Link>
              <Link
                href="/book"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-primary-dark"
              >
                {t("bookNow")}
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="flex w-6 flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-secondary transition-all duration-300 ${
                  mobileMenuOpen
                    ? "translate-y-2 rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-secondary transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-secondary transition-all duration-300 ${
                  mobileMenuOpen
                    ? "-translate-y-2 -rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-40 flex h-full w-4/5 max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Content */}
        <div className="flex flex-1 flex-col justify-between px-6 pt-24 pb-8">
          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-lg font-medium text-secondary transition-colors duration-200 hover:bg-background"
            >
              {t("locations")}
            </Link>
            <a
              href="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-lg font-medium text-secondary transition-colors duration-200 hover:bg-background"
            >
              {t("about")}
            </a>
            <div className="px-4 py-3">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile CTA Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              href="/tour"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full border border-secondary px-5 py-3 text-center text-base font-medium text-secondary transition-all duration-200 hover:bg-secondary hover:text-white"
            >
              {t("scheduleTour")}
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full bg-primary px-5 py-3 text-center text-base font-medium text-white transition-all duration-200 hover:bg-primary-dark"
            >
              {t("bookNow")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

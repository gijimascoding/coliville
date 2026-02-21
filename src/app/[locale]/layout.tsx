import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Coliville | Coliving in Montreal",
  description:
    "Discover modern coliving in Montreal. Coliville offers beautifully designed shared living locations for students and young professionals seeking community, comfort, and convenience.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Google Ads Global Site Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17953956338"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17953956338');
          `}
        </Script>
        {/* GA4 — replace G-XXXXXXXXXX with your real Measurement ID */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased bg-background`}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/12029329201?text=Hi%2C%20I%27m%20interested%20in%20a%20room%20at%20Coliville"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            aria-label="Chat on WhatsApp"
          >
            <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
              <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.9 15.9 0 008.832 2.672C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.392 1.106-1.942 2.024-3.182 2.292-.848.18-1.956.324-5.684-1.222-4.772-1.978-7.834-6.832-8.072-7.148-.228-.316-1.918-2.554-1.918-4.87s1.214-3.456 1.646-3.928c.432-.472.942-.59 1.256-.59.314 0 .628.004.902.016.29.014.678-.11 1.06.808.392.944 1.334 3.26 1.452 3.498.118.236.196.512.04.828-.158.316-.236.512-.472.788-.236.276-.498.616-.71.828-.236.236-.482.492-.208.964.276.472 1.224 2.018 2.628 3.268 1.808 1.608 3.332 2.106 3.804 2.342.472.236.748.196 1.024-.118.276-.316 1.178-1.374 1.492-1.846.314-.472.628-.394 1.06-.236.432.158 2.746 1.296 3.218 1.532.472.236.786.354.904.55.118.196.118 1.128-.274 2.234z" />
            </svg>
          </a>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

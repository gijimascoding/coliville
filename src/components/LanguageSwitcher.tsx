"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.replace(
      // @ts-expect-error — pathname is valid
      { pathname },
      { locale: newLocale }
    );
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border-light bg-background px-0.5 py-0.5">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
            locale === loc
              ? "bg-primary text-white shadow-sm"
              : "text-text-muted hover:text-secondary"
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

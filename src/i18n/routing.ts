import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/locations": {
      en: "/locations",
      fr: "/lieux",
    },
    "/locations/[slug]": {
      en: "/locations/[slug]",
      fr: "/lieux/[slug]",
    },
    "/apply": {
      en: "/apply",
      fr: "/postuler",
    },
    "/tour": {
      en: "/tour",
      fr: "/visite",
    },
  },
});

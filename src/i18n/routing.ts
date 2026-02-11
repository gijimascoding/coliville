import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/locations": "/locations",
    "/locations/[slug]": "/locations/[slug]",
    "/book": "/book",
    "/tour": "/tour",
  },
});

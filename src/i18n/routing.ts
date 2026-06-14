import { defineRouting } from "next-intl/routing";

export type Locale = "ro" | "en" | "ru";

export const routing = defineRouting({
  locales: ["ro", "en", "ru"],
  defaultLocale: "ro",
  pathnames: {
    "/": "/",
    "/servicii": {
      ro: "/servicii",
      en: "/services",
      ru: "/uslugi",
    },
    "/portofoliu": {
      ro: "/portofoliu",
      en: "/portfolio",
      ru: "/portfolio",
    },
    "/despre": {
      ro: "/despre",
      en: "/about",
      ru: "/o-nas",
    },
    "/blog": "/blog",
    "/contact": "/contact",
    "/preturi": {
      ro: "/preturi",
      en: "/pricing",
      ru: "/tseny",
    },
  },
});

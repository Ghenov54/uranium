import { defineType, defineField } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Homepage Content",
  type: "document",
  fields: [
    defineField({ name: "heroTitle", title: "Hero Title", type: "localeString" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "localeText" }),
    defineField({ name: "heroCta", title: "Hero CTA Button", type: "localeString" }),
    defineField({ name: "servicesLabel", title: "Services Section Label", type: "localeString" }),
    defineField({ name: "servicesHeading", title: "Services Section Heading", type: "localeString" }),
    defineField({ name: "portfolioLabel", title: "Portfolio Section Label", type: "localeString" }),
    defineField({ name: "portfolioHeading", title: "Portfolio Section Heading", type: "localeString" }),
    defineField({ name: "ctaTitle", title: "CTA Section Title", type: "localeString" }),
    defineField({ name: "ctaSubtitle", title: "CTA Section Subtitle", type: "localeText" }),
    defineField({ name: "ctaButton", title: "CTA Button Label", type: "localeString" }),
  ],
  preview: { select: { title: "heroTitle.ro" } },
});

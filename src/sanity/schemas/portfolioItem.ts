import { defineType, defineField } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (R) => R.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["web", "apps", "marketing", "design", "business"] },
      validation: (R) => R.required(),
    }),
    defineField({ name: "categoryLabel", title: "Category Label", type: "localeString" }),
    defineField({ name: "mainImage", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "color", title: "Fallback Color (hex)", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title.ro", subtitle: "category", media: "mainImage" },
  },
});

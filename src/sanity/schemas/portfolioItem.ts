import { defineType, defineField } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "localeString", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.ro", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["web", "apps", "marketing", "design", "business"] },
      validation: (R) => R.required(),
    }),
    defineField({ name: "categoryLabel", title: "Category Label", type: "localeString" }),
    defineField({ name: "client", title: "Client Name", type: "localeString" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "mainImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Description", type: "localeText" }),
    defineField({ name: "results", title: "Results / Outcomes", type: "localeText" }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "caption", type: "string", title: "Caption" }] }],
    }),
    defineField({ name: "color", title: "Fallback Color (hex)", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title.ro", subtitle: "category", media: "mainImage" },
  },
});

import { defineType, defineField } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() }),
    defineField({ name: "language", title: "Language", type: "string", readOnly: true, hidden: true }),
    defineField({ name: "excerpt", title: "Excerpt (~160 chars)", type: "text", rows: 3 }),
    defineField({ name: "mainImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "blockContent" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
  },
});

import { defineType, defineField } from "sanity";

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "localeString", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name.ro" },
      validation: (R) => R.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "localeString" }),
    defineField({ name: "description", title: "Short Description", type: "localeText" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "features",
      title: "Features (max 6)",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "title", title: "Feature Title", type: "localeString" },
          { name: "description", title: "Feature Description", type: "localeText" },
        ],
      }],
      validation: (R) => R.max(6),
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name.ro", subtitle: "slug.current" },
  },
});

import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role", type: "localeString" }),
    defineField({ name: "bio", title: "Bio", type: "localeText" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role.ro", media: "photo" },
  },
});

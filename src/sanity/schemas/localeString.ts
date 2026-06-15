import { defineType, defineField } from "sanity";

export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: [
    defineField({ name: "ro", title: "Română", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
    defineField({ name: "ru", title: "Русский", type: "string" }),
  ],
});

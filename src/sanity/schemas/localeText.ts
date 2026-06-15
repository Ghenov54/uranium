import { defineType, defineField } from "sanity";

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: [
    defineField({ name: "ro", title: "Română", type: "text" }),
    defineField({ name: "en", title: "English", type: "text" }),
    defineField({ name: "ru", title: "Русский", type: "text" }),
  ],
});

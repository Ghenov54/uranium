import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "logoText", title: "Logo Text", type: "string" }),
    defineField({ name: "tagline", title: "Footer Tagline", type: "localeString" }),
    defineField({ name: "email", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "localeString" }),
    defineField({ name: "workingHours", title: "Working Hours", type: "localeString" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "twitterUrl", title: "Twitter/X URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
  ],
  preview: { select: { title: "logoText" } },
});

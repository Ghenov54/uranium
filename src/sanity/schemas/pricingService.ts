import { defineType, defineField } from "sanity";

export const pricingService = defineType({
  name: "pricingService",
  title: "Pricing Service",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Service Key",
      type: "string",
      options: { list: ["web", "apps", "marketing", "business", "design"] },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "items",
      title: "Pricing Items",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "localeString" },
          { name: "includes", title: "Includes", type: "array", of: [{ type: "localeString" }] },
          { name: "priceFrom", title: "Price From (€)", type: "number" },
          { name: "unit", title: "Unit (e.g. /lună)", type: "localeString" },
        ],
        preview: { select: { title: "name.ro", subtitle: "priceFrom" } },
      }],
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "key" } },
});

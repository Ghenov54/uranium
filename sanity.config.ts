import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schema } from "./src/sanity/schemas";

export default defineConfig({
  name: "uranium",
  title: "Uranium Studio",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "ro", title: "Română" },
        { id: "en", title: "English" },
        { id: "ru", title: "Русский" },
      ],
      schemaTypes: ["post"],
    }),
  ],
  schema,
});

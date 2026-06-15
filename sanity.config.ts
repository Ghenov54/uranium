import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schema } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  name: "uranium",
  title: "Uranium Studio",
  basePath: "/studio",
  projectId: "3avhk8pg",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
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

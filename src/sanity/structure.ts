import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("📝 Blog")
        .child(S.documentTypeList("post").title("Blog Posts")),
      S.divider(),
      S.listItem()
        .title("🏠 Homepage")
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Homepage Content")
        ),
      S.listItem()
        .title("⚙️ Site Settings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
      S.divider(),
      S.listItem()
        .title("💼 Portofoliu")
        .child(S.documentTypeList("portfolioItem").title("Portfolio Items")),
      S.listItem()
        .title("🛠️ Servicii")
        .child(S.documentTypeList("serviceItem").title("Services")),
      S.listItem()
        .title("👥 Echipă")
        .child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem()
        .title("💰 Prețuri")
        .child(S.documentTypeList("pricingService").title("Pricing Services")),
    ]);

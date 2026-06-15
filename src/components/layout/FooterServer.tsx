import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site";
import { Footer } from "./Footer";

export async function FooterServer() {
  const siteData = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null);
  return <Footer siteData={siteData} />;
}

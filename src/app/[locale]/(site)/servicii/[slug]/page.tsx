import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { SERVICE_ITEM_QUERY, SERVICE_SLUGS_QUERY } from "@/sanity/queries/services";
import { PORTFOLIO_ITEMS_QUERY } from "@/sanity/queries/portfolio";
import { ServiceDetailTemplate } from "@/components/sections/service/ServiceDetailTemplate";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch(SERVICE_SLUGS_QUERY).catch(() => []);
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [serviceItem, portfolioItems] = await Promise.all([
    client.fetch(SERVICE_ITEM_QUERY, { slug }).catch(() => null),
    client.fetch(PORTFOLIO_ITEMS_QUERY).catch(() => []),
  ]);

  if (!serviceItem) notFound();

  const slugToCategory: Record<string, string> = {
    web: "web",
    aplicatii: "apps",
    marketing: "marketing",
    business: "business",
    design: "design",
  };
  const category = slugToCategory[slug] ?? slug;
  const relatedProjects = portfolioItems
    .filter((p: { category: string }) => p.category === category)
    .slice(0, 3);

  return <ServiceDetailTemplate serviceItem={serviceItem} relatedProjects={relatedProjects} />;
}

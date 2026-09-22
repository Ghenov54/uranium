import { notFound } from "next/navigation";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { PORTFOLIO_ITEM_QUERY } from "@/sanity/queries/portfolio";
import { ProjectDetail } from "./ProjectDetail";

export const dynamic = "force-dynamic";

const ORDER_QUERY = groq`*[_type == "portfolioItem" && defined(slug.current)] | order(order asc) { "slug": slug.current, title, mainImage }`;

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;
  const [project, order] = await Promise.all([
    client.fetch(PORTFOLIO_ITEM_QUERY, { slug }).catch(() => null),
    client.fetch<{ slug: string; title: Record<string, string> | null; mainImage?: { asset?: { _ref?: string } } }[]>(ORDER_QUERY).catch(() => []),
  ]);
  if (!project) notFound();

  // The project after this one, wrapping around to the first.
  const at = order.findIndex((o) => o.slug === slug);
  const next = order.length > 1 ? order[(at + 1) % order.length] : null;

  return <ProjectDetail project={project} next={next} />;
}

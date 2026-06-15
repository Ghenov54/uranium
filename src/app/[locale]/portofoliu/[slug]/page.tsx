import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { PORTFOLIO_ITEM_QUERY, PORTFOLIO_RELATED_QUERY } from "@/sanity/queries/portfolio";
import { ProjectDetail } from "./ProjectDetail";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function PortfolioItemPage({ params }: Props) {
  const { slug } = await params;

  const project = await client
    .fetch(PORTFOLIO_ITEM_QUERY, { slug })
    .catch(() => null);

  if (!project) notFound();

  const related = await client
    .fetch(PORTFOLIO_RELATED_QUERY, { slug, category: project.category })
    .catch(() => []);

  return (
    <div style={{ background: "var(--color-bg)" }}>
      <ProjectDetail project={project} related={related} />
    </div>
  );
}

import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/sections/service/ServiceDetailTemplate";
import type { ServiceKey } from "@/components/sections/service/ServiceDetailTemplate";

const validSlugs: ServiceKey[] = ["web", "aplicatii", "marketing", "business", "design"];

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!validSlugs.includes(slug as ServiceKey)) notFound();
  return <ServiceDetailTemplate serviceKey={slug as ServiceKey} />;
}

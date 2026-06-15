export type ProjectCategory = "web" | "apps" | "marketing" | "design" | "business";

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  color: string;
};

export const projects: Project[] = [
  { id: 1, title: "Studio Rebrand", category: "design", categoryLabel: "Brand Identity · Design", color: "#1e3a8a" },
  { id: 2, title: "FinanceFlow Platform", category: "apps", categoryLabel: "Product Design · Web App", color: "#2563eb" },
  { id: 3, title: "Luxury E-Commerce", category: "web", categoryLabel: "Web Development · E-Commerce", color: "#374151" },
  { id: 4, title: "Wellness Mobile App", category: "apps", categoryLabel: "UI/UX · Mobile App", color: "#1f2937" },
  { id: 5, title: "TechCorp Landing Page", category: "web", categoryLabel: "Landing Page · Web", color: "#0f172a" },
  { id: 6, title: "Brand Identity Package", category: "design", categoryLabel: "Branding · Identity", color: "#312e81" },
  { id: 7, title: "Google Ads Campaign", category: "marketing", categoryLabel: "Google Ads · Marketing", color: "#065f46" },
  { id: 8, title: "ERP Implementation", category: "business", categoryLabel: "ERP · Business", color: "#1c1917" },
];

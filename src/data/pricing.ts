import type { ProjectCategory } from "./portfolio";

export type PricingItem = {
  name: string;
  includes: string[];
  priceFrom: number;
  unit?: string;
};

export type ServicePricing = {
  key: ProjectCategory;
  items: PricingItem[];
};

export const pricingData: ServicePricing[] = [
  {
    key: "web",
    items: [
      { name: "Landing Page", includes: ["Design custom", "Responsiv mobile", "SEO de bază", "Hosting 1 an", "SSL inclus"], priceFrom: 500 },
      { name: "Site Prezentare", includes: ["Până la 10 pagini", "Design custom", "CMS integrat", "SEO On-Page", "Hosting 1 an", "SSL inclus"], priceFrom: 1200 },
      { name: "E-Commerce", includes: ["Produse nelimitate", "Plăți online", "Design custom", "Admin dashboard", "SEO complet", "Suport 6 luni"], priceFrom: 3500 },
    ],
  },
  {
    key: "apps",
    items: [
      { name: "Web App", includes: ["Design UI/UX", "Frontend + Backend", "Autentificare", "Panou admin", "API REST", "Deploy inclus"], priceFrom: 4000 },
      { name: "Mobile App iOS/Android", includes: ["Design nativ", "iOS + Android", "Push notifications", "Integrări API", "Deploy store", "Suport 6 luni"], priceFrom: 8000 },
      { name: "PWA", includes: ["Funcționare offline", "Instalabil", "Push notifications", "Performanță maximă", "Cross-platform"], priceFrom: 3000 },
    ],
  },
  {
    key: "marketing",
    items: [
      { name: "SEO", includes: ["Audit complet", "Optimizare on-page", "Link building", "Raport lunar", "Google Search Console"], priceFrom: 300, unit: "/lună" },
      { name: "Google Ads", includes: ["Setup campanii", "Targeting avansat", "Optimizare continuă", "Rapoarte săptămânale", "Call tracking"], priceFrom: 400, unit: "/lună" },
      { name: "Social Media", includes: ["4 postări/săptămână", "Grafică custom", "Story-uri", "Moderare comentarii", "Raport lunar"], priceFrom: 500, unit: "/lună" },
    ],
  },
  {
    key: "business",
    items: [
      { name: "Implementare CRM", includes: ["Analiză nevoi", "Setup & configurare", "Import date", "Training echipă", "Suport 3 luni"], priceFrom: 2000 },
      { name: "Automatizări Business", includes: ["Analiză procese", "Implementare workflow", "Integrări sisteme", "Testare & validare", "Documentație"], priceFrom: 1500 },
      { name: "Consultanță Strategică", includes: ["Audit digital", "Strategie personalizată", "Roadmap implementare", "Follow-up lunar"], priceFrom: 150, unit: "/oră" },
    ],
  },
  {
    key: "design",
    items: [
      { name: "Logo & Identitate Vizuală", includes: ["Concept logo", "Variante culori", "Brand guidelines de bază", "Formate SVG/PNG/PDF"], priceFrom: 800 },
      { name: "UI/UX Design", includes: ["Research utilizatori", "Wireframes", "Prototip interactiv", "Design system", "Handoff Figma"], priceFrom: 2500 },
      { name: "Full Branding Package", includes: ["Logo + identitate", "Brand guidelines complete", "Materiale marketing", "Social media kit", "Prezentare brand"], priceFrom: 4500 },
    ],
  },
];

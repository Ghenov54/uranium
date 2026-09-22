import type { ReactNode } from "react";
import { Nav } from "@/components/u/Nav";
import { Footer } from "@/components/u/Footer";
import { SmoothScroll } from "@/components/u/SmoothScroll";
import { ChatWidget } from "@/components/ui/ChatWidget";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main id="top">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}

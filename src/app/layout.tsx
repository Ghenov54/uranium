import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const onest = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uranium | Digital Studio",
  description: "Websites, apps, marketing and brands for companies in Moldova and worldwide.",
};

export const viewport: Viewport = {
  themeColor: "#f0eff3",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning className={onest.variable}>
      <body>
        <ThemeProvider attribute="data-theme" forcedTheme="light" defaultTheme="light" enableSystem={false} storageKey="uranium-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

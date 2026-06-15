import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { FooterServer } from "@/components/layout/FooterServer";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!(routing.locales as readonly string[]).includes(locale)) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages} locale={locale as Locale}>
      <div lang={locale} className="contents">
        <Navbar />
        <main>{children}</main>
        <FooterServer />
      </div>
    </NextIntlClientProvider>
  );
}

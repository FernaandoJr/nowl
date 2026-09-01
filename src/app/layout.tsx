import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { routing } from "@/i18n/routing"
import { SITE_NAME, SITE_URL } from "@/lib/site"

import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations("meta")
  const title = t("title")
  const description = t("description")
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US"

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title,
    description,
    authors: [{ name: "FernaandoJr", url: "https://github.com/FernaandoJr" }],
    creator: "FernaandoJr",
    alternates: {
      canonical: "/",
      languages: Object.fromEntries(routing.locales.map((l) => [l, "/"])),
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages, getTranslations } from "next-intl/server"

import { ThemeProvider } from "@/components/theme-provider"
import { routing } from "@/i18n/routing"
import {
  AUTHOR_NAME,
  AUTHOR_URL,
  OG_IMAGE,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site"

import "./globals.css"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#211f2a" },
  ],
  colorScheme: "light dark",
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations("meta")
  const title = t("title")
  const description = t("description")
  const keywords = t.raw("keywords") as string[]
  const ogLocale = locale === "pt" ? "pt_BR" : "en_US"
  const ogLocaleAlternate = locale === "pt" ? "en_US" : "pt_BR"

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: title,
      template: t("titleTemplate"),
    },
    description,
    keywords,
    category: "education",
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      languages: {
        pt: "/",
        en: "/",
        "x-default": "/",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: ogLocaleAlternate,
      url: SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE_URL],
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "default",
    },
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html
      lang={locale === "pt" ? "pt-BR" : "en"}
      suppressHydrationWarning
      className="h-full"
    >
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

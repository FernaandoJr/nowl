import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { JsonLd } from "@/components/json-ld"
import { buildReadJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

import { ReadPageClient } from "./read-page-client"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta")
  const title = t("readTitle")
  const description = t("readDescription")

  return {
    title,
    description,
    alternates: {
      canonical: "/read",
      languages: {
        pt: `${SITE_URL}/read`,
        en: `${SITE_URL}/read`,
        "x-default": `${SITE_URL}/read`,
      },
    },
    openGraph: {
      url: `${SITE_URL}/read`,
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ReadPage() {
  const t = await getTranslations("meta")

  return (
    <>
      <JsonLd data={buildReadJsonLd(t("readDescription"))} />
      <ReadPageClient />
    </>
  )
}

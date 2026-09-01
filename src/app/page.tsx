import { getLocale, getTranslations } from "next-intl/server"

import { JsonLd } from "@/components/json-ld"
import { LandingDetails } from "@/components/landing-details"
import { LandingHero } from "@/components/landing-hero"
import { buildHomeJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"

import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: "/",
      languages: {
        pt: SITE_URL,
        en: SITE_URL,
        "x-default": SITE_URL,
      },
    },
  }
}

export default async function Home() {
  const locale = await getLocale()
  const meta = await getTranslations("meta")
  const landing = await getTranslations("landing")
  const faq = (landing.raw("faq") as { q: string; a: string }[]).map(
    (item) => ({
      question: item.q,
      answer: item.a,
    })
  )

  return (
    <main>
      <JsonLd
        data={buildHomeJsonLd({
          locale,
          name: meta("title"),
          description: meta("description"),
          faq,
        })}
      />
      <LandingHero />
      <LandingDetails />
    </main>
  )
}

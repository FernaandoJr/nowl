import {
  AUTHOR_NAME,
  AUTHOR_URL,
  GITHUB_REPO,
  LOGO_PATH,
  OG_IMAGE_PATH,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site"

type JsonLdInput = {
  locale: string
  name: string
  description: string
}

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function buildHomeJsonLd({ locale, name, description }: JsonLdInput) {
  const logo = `${SITE_URL}${LOGO_PATH}`
  const image = `${SITE_URL}${OG_IMAGE_PATH}`
  const websiteId = `${SITE_URL}/#website`
  const appId = `${SITE_URL}/#app`
  const authorId = `${SITE_URL}/#author`

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": authorId,
        name: AUTHOR_NAME,
        url: AUTHOR_URL,
        sameAs: [AUTHOR_URL, GITHUB_REPO],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [SITE_TAGLINE],
        description,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": authorId },
      },
      {
        "@type": "WebApplication",
        "@id": appId,
        name,
        alternateName: SITE_TAGLINE,
        url: SITE_URL,
        applicationCategory: "EducationalApplication",
        applicationSubCategory: "Speed reading",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        inLanguage: ["pt-BR", "en"],
        image,
        screenshot: image,
        logo,
        author: { "@id": authorId },
        publisher: { "@id": authorId },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "RSVP one-word-at-a-time reading",
          "Fixed ORP pivot",
          "Smart pacing for long words and punctuation",
          "Portuguese and English",
          "Light and dark theme",
        ],
        isPartOf: { "@id": websiteId },
      },
    ],
  }
}

export function buildReadJsonLd(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: `${SITE_URL}/read`,
    description,
    applicationCategory: "EducationalApplication",
    isAccessibleForFree: true,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  }
}

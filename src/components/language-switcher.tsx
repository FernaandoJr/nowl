"use client"

import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { LOCALE_COOKIE, type Locale } from "@/i18n/routing"

const languages = [
  { locale: "pt" as const, labelKey: "portuguese", image: "/pt-br.svg" },
  { locale: "en" as const, labelKey: "english", image: "/en.svg" },
] satisfies ReadonlyArray<{
  locale: Locale
  labelKey: "portuguese" | "english"
  image: string
}>

export function LanguageSwitcher() {
  const t = useTranslations("nav")
  const locale = useLocale() as Locale
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const selectedLang =
    languages.find((lang) => lang.locale === locale) ?? languages[0]!
  const nextLocale =
    languages.find((lang) => lang.locale !== locale)?.locale ?? "en"

  function handleToggle() {
    if (nextLocale === locale) return
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="size-9"
        disabled
      >
        <Image
          src={languages[0]!.image}
          alt=""
          width={24}
          height={24}
          className="size-6 object-contain"
        />
        <span className="sr-only">{t("languages")}</span>
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="size-9"
      onClick={handleToggle}
      aria-label={`${t("languages")}: ${t(selectedLang.labelKey)}`}
    >
      <Image
        src={selectedLang.image}
        alt=""
        width={24}
        height={24}
        className="size-6 object-contain"
      />
      <span className="sr-only">{t(selectedLang.labelKey)}</span>
    </Button>
  )
}

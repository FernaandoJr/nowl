"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"

import { HeroShader } from "@/components/hero-shader"
import { LanguageSwitcher } from "@/components/language-switcher"
import { OwlMark } from "@/components/owl-mark"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  const t = useTranslations("hero")

  return (
    <section className="relative h-dvh overflow-hidden">
      <HeroShader className="!absolute opacity-25" />

      <div className="absolute top-2 right-2 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 flex h-dvh flex-col overflow-y-auto">
        <div className="container flex min-h-0 flex-1 flex-col items-center justify-center py-8">
          <div className="flex max-w-xl flex-col items-center gap-5 text-center">
            <OwlMark className="size-24 rounded-2xl" />
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="sr-only">NOW — </span>
              <span className="text-primary">N</span>ext{" "}
              <span className="text-primary">O</span>ne{" "}
              <span className="text-primary">W</span>ord
            </h1>
            <p className="max-w-prose text-base text-foreground sm:text-lg">
              {t("body")}
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/read" />}
              className="h-10 rounded-full px-6 text-[14px] font-medium shadow"
            >
              {t("openReader")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

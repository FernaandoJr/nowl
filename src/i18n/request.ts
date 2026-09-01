import { cookies } from "next/headers"
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { LOCALE_COOKIE, routing, type Locale } from "./routing"

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value

  const locale: Locale = hasLocale(routing.locales, cookieLocale)
    ? (cookieLocale as Locale)
    : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})

import { getTranslations } from "next-intl/server"

import { GITHUB_REPO } from "@/lib/site"

type Step = { title: string; body: string }
type Faq = { q: string; a: string }

export async function LandingDetails() {
  const t = await getTranslations("landing")
  const steps = t.raw("steps") as Step[]
  const faq = t.raw("faq") as Faq[]

  return (
    <div className="relative z-10 border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-12 px-6 py-16 tracking-[-0.15px]">
        <section aria-labelledby="how-heading" className="flex flex-col gap-6">
          <h2
            id="how-heading"
            className="text-[24px] font-medium text-foreground"
          >
            {t("howTitle")}
          </h2>
          <ol className="flex flex-col gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="flex flex-col gap-1">
                <h3 className="text-[14px] font-medium text-foreground">
                  <span className="text-primary">{index + 1}. </span>
                  {step.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="flex flex-col gap-6">
          <h2
            id="faq-heading"
            className="text-[24px] font-medium text-foreground"
          >
            {t("faqTitle")}
          </h2>
          <div className="flex flex-col gap-5">
            {faq.map((item) => (
              <article key={item.q} className="flex flex-col gap-1">
                <h3 className="text-[14px] font-medium text-foreground">
                  {item.q}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </article>
            ))}
          </div>
        </section>

        <footer className="flex items-center justify-between gap-3 text-[13px] text-muted-foreground">
          <span>{t("footer")}</span>
          <a
            href={GITHUB_REPO}
            className="hover:text-foreground"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </footer>
      </div>
    </div>
  )
}

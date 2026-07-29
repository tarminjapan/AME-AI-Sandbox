import { useSettings } from '../settings/SettingsContext'
import { HeroIllustration } from './icons/HeroIllustration'

export function Hero() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 pb-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">{t.hero.title}</h1>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-gray-600 dark:text-gray-400">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://github.com/tarminjapan/AME-AI-Sandbox"
              className="rounded-md bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
            >
              {t.hero.ctaGithub}
            </a>
            <a
              href="#quick-start"
              className="rounded-md px-6 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:text-gray-300 dark:hover:text-gray-100"
            >
              {t.hero.ctaQuickStart}
            </a>
          </div>
        </div>
        <HeroIllustration className="w-full text-gray-300 dark:text-gray-700" />
      </div>
    </section>
  )
}

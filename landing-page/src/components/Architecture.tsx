import { useSettings } from '../settings/SettingsContext'
import { LockIcon } from './icons/LockIcon'
import { ArrowRightIcon } from './icons/ArrowRightIcon'
import { BoxIcon } from './icons/BoxIcon'

export function Architecture() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.architecture.heading}</h2>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {t.architecture.body}
      </p>

      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="flex w-44 flex-col items-center gap-3 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
          <LockIcon className="h-6 w-6 text-[var(--color-primary)]" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.architecture.host}</span>
        </div>

        <ArrowRightIcon className="h-5 w-5 shrink-0 rotate-90 text-gray-400 sm:rotate-0 dark:text-gray-600" />

        <div className="flex w-64 flex-col items-center gap-4 rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <BoxIcon className="h-6 w-6 text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.architecture.container}</span>
          </div>
          <div className="flex w-full flex-col gap-2">
            {[t.architecture.cliClaude, t.architecture.cliOpenCode, t.architecture.cliAntigravity].map((cli) => (
              <span
                key={cli}
                className="rounded-md bg-white px-3 py-1.5 text-center font-mono text-xs text-gray-600 dark:bg-gray-900 dark:text-gray-400"
              >
                {cli}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

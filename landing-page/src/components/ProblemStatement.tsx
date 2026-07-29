import { useSettings } from '../settings/SettingsContext'

export function ProblemStatement() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.problem.heading}</h2>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t.problem.body}</p>
    </section>
  )
}

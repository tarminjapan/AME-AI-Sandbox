import { useSettings } from '../settings/SettingsContext'
import { TerminalIcon } from './icons/TerminalIcon'

export function QuickStart() {
  const { t } = useSettings()
  return (
    <section id="quick-start" className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center gap-2">
        <TerminalIcon className="h-5 w-5 text-[var(--color-primary)]" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.quickStart.heading}</h2>
      </div>
      <ol className="mt-6 flex flex-col gap-4">
        {t.quickStart.steps.map((step, index) => (
          <li key={step.command} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {index + 1}. {step.label}
            </span>
            <code className="rounded-md bg-gray-50 px-4 py-2 font-mono text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {step.command}
            </code>
          </li>
        ))}
      </ol>
    </section>
  )
}

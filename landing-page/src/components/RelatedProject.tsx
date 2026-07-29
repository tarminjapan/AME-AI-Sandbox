import { useSettings } from '../settings/SettingsContext'
import { ExternalLinkIcon } from './icons/ExternalLinkIcon'

export function RelatedProject() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.related.heading}</h2>
      <a
        href="https://github.com/tarminjapan/AME-AI-Review-System"
        className="mt-6 block rounded-lg bg-gray-50 p-6 transition-colors duration-200 ease-out hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:bg-gray-800 dark:hover:bg-gray-800/70"
      >
        <div className="flex items-center gap-2">
          <ExternalLinkIcon className="h-4 w-4 text-[var(--color-primary)]" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.related.name}</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{t.related.body}</p>
      </a>
    </section>
  )
}

import { useSettings } from '../settings/SettingsContext'
import { ShieldIcon } from './icons/ShieldIcon'

export function SecurityNotes() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center gap-2">
        <ShieldIcon className="h-5 w-5 text-[var(--color-primary)]" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.security.heading}</h2>
      </div>
      <ul className="mt-6 flex flex-col gap-3">
        {t.security.notes.map((note) => (
          <li key={note} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

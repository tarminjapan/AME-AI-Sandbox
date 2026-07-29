import { useSettings } from '../settings/SettingsContext'
import { SettingsMenu } from './SettingsMenu'

export function Header() {
  const { t } = useSettings()
  return (
    <header className="mx-auto max-w-4xl px-6 pt-8">
      <div className="flex items-center justify-between gap-4">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.header.logo}</span>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/tarminjapan/AME-AI-Sandbox"
            className="rounded-md px-3 py-2 text-sm font-normal text-gray-600 transition-colors duration-200 ease-out hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:text-gray-400 dark:hover:text-gray-100"
          >
            {t.header.github}
          </a>
          <SettingsMenu />
        </div>
      </div>
    </header>
  )
}

import { useSettings } from '../settings/SettingsContext'
import { CpuIcon } from './icons/CpuIcon'

const STACK = ['Ubuntu 24.04 LTS', 'Python 3.14 (uv)', 'Node.js v24', 'Go', 'GitHub CLI (gh)']

export function TechStack() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex items-center gap-2">
        <CpuIcon className="h-5 w-5 text-[var(--color-primary)]" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.techStack.heading}</h2>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2">
        {STACK.map((item) => (
          <li
            key={item}
            className="rounded-md bg-gray-50 px-4 py-2 font-mono text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

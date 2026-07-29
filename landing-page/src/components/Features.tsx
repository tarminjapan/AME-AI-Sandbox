import type { ComponentType } from 'react'
import { useSettings } from '../settings/SettingsContext'
import { BoxIcon } from './icons/BoxIcon'
import { LockIcon } from './icons/LockIcon'
import { FileIcon } from './icons/FileIcon'
import { NetworkIcon } from './icons/NetworkIcon'

const ICONS: ComponentType<{ className?: string }>[] = [BoxIcon, LockIcon, FileIcon, NetworkIcon]

export function Features() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.features.heading}</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {t.features.items.map((feature, index) => {
          const Icon = ICONS[index % ICONS.length]
          return (
            <div key={feature.title} className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
              <Icon className="h-6 w-6 text-[var(--color-primary)]" />
              <h3 className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{feature.body}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

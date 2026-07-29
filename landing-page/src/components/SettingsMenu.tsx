import { useEffect, useRef, useState } from 'react'
import { useSettings, type Theme, type FontSet } from '../settings/SettingsContext'
import type { ColorPresetId } from '../settings/colorPresets'
import type { Locale } from '../i18n/translations'
import { SettingsIcon } from './icons/SettingsIcon'
import { CheckIcon } from './icons/CheckIcon'

const optionButtonClass =
  'rounded-md px-3 py-1.5 text-sm font-normal transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]'

function OptionButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${optionButtonClass} ${
        active
          ? 'bg-[var(--color-primary)] text-white'
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
      }`}
    >
      {children}
    </button>
  )
}

export function SettingsMenu() {
  const { locale, setLocale, theme, setTheme, fontSet, setFontSet, colorPreset, setColorPreset, colorPresets, t } =
    useSettings()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const colorLabel: Record<ColorPresetId, string> = {
    'trust-blue': t.settings.colorTrustBlue,
    'stable-green': t.settings.colorStableGreen,
    'grounded-orange': t.settings.colorGroundedOrange,
    'sophisticated-indigo': t.settings.colorSophisticatedIndigo,
    'clarity-teal': t.settings.colorClarityTeal,
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t.settings.menuLabel}
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md p-2 text-gray-600 transition-colors duration-200 ease-out hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>

      {open ? (
        <div className="absolute right-0 z-10 mt-2 w-72 rounded-lg bg-white p-6 dark:bg-gray-800">
          <div className="flex flex-col gap-6">
            <fieldset>
              <legend className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.settings.language}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(['ja', 'en'] as Locale[]).map((option) => (
                  <OptionButton key={option} active={locale === option} onClick={() => setLocale(option)}>
                    {/* 表示中のロケールに関わらず常に判読できるよう、選択肢自体のフォントは
                        --font-ui-current に依存させず明示的に指定する。 */}
                    <span lang={option} style={{ fontFamily: option === 'ja' ? "'Noto Sans JP', sans-serif" : "'Noto Sans', sans-serif" }}>
                      {option === 'ja' ? '日本語' : 'English'}
                    </span>
                  </OptionButton>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.settings.theme}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ['light', t.settings.themeLight],
                    ['dark', t.settings.themeDark],
                    ['system', t.settings.themeSystem],
                  ] as [Theme, string][]
                ).map(([option, label]) => (
                  <OptionButton key={option} active={theme === option} onClick={() => setTheme(option)}>
                    {label}
                  </OptionButton>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.settings.font}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ['default', t.settings.fontDefault],
                    ['serif', t.settings.fontSerif],
                  ] as [FontSet, string][]
                ).map(([option, label]) => (
                  <OptionButton key={option} active={fontSet === option} onClick={() => setFontSet(option)}>
                    {label}
                  </OptionButton>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-medium text-gray-500 dark:text-gray-400">{t.settings.color}</legend>
              <div className="mt-2 flex flex-wrap gap-3">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    aria-pressed={colorPreset === preset.id}
                    aria-label={colorLabel[preset.id]}
                    title={colorLabel[preset.id]}
                    onClick={() => setColorPreset(preset.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
                    style={{ backgroundColor: preset.light }}
                  >
                    {colorPreset === preset.id ? <CheckIcon className="h-4 w-4 text-white" /> : null}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </div>
      ) : null}
    </div>
  )
}

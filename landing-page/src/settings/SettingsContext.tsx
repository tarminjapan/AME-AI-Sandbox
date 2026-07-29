import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { TRANSLATIONS, type Locale, type Strings } from '../i18n/translations'
import { COLOR_PRESETS, getColorPreset, type ColorPresetId } from './colorPresets'

export type Theme = 'light' | 'dark' | 'system'
export type FontSet = 'default' | 'serif'

interface AppSettings {
  locale: Locale
  theme: Theme
  fontSet: FontSet
  colorPreset: ColorPresetId
}

const STORAGE_KEY = 'app_settings'

const DEFAULT_SETTINGS: AppSettings = {
  locale: 'ja',
  theme: 'system',
  fontSet: 'default',
  colorPreset: 'trust-blue',
}

function loadSettings(): AppSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    const parsed = JSON.parse(raw) as Partial<AppSettings>
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function fontFamilyFor(locale: Locale, fontSet: FontSet): string {
  if (locale === 'ja') {
    return fontSet === 'serif' ? "'Noto Serif JP', serif" : "'Noto Sans JP', sans-serif"
  }
  return fontSet === 'serif' ? "'Noto Serif', serif" : "'Noto Sans', sans-serif"
}

interface SettingsContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  fontSet: FontSet
  setFontSet: (fontSet: FontSet) => void
  colorPreset: ColorPresetId
  setColorPreset: (colorPreset: ColorPresetId) => void
  colorPresets: typeof COLOR_PRESETS
  t: Strings
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(loadSettings)
  const [prefersDark, setPrefersDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => setPrefersDark(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const resolvedTheme: 'light' | 'dark' =
    settings.theme === 'system' ? (prefersDark ? 'dark' : 'light') : settings.theme

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
    root.lang = settings.locale

    const preset = getColorPreset(settings.colorPreset)
    root.style.setProperty('--color-primary', resolvedTheme === 'dark' ? preset.dark : preset.light)
    root.style.setProperty('--font-ui-current', fontFamilyFor(settings.locale, settings.fontSet))
  }, [resolvedTheme, settings.locale, settings.colorPreset, settings.fontSet])

  const value = useMemo<SettingsContextValue>(
    () => ({
      locale: settings.locale,
      setLocale: (locale) => setSettings((prev) => ({ ...prev, locale })),
      theme: settings.theme,
      setTheme: (theme) => setSettings((prev) => ({ ...prev, theme })),
      resolvedTheme,
      fontSet: settings.fontSet,
      setFontSet: (fontSet) => setSettings((prev) => ({ ...prev, fontSet })),
      colorPreset: settings.colorPreset,
      setColorPreset: (colorPreset) => setSettings((prev) => ({ ...prev, colorPreset })),
      colorPresets: COLOR_PRESETS,
      t: TRANSLATIONS[settings.locale],
    }),
    [settings, resolvedTheme],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}

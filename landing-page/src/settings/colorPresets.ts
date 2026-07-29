export type ColorPresetId =
  | 'trust-blue'
  | 'stable-green'
  | 'grounded-orange'
  | 'sophisticated-indigo'
  | 'clarity-teal'

interface ColorPreset {
  id: ColorPresetId
  light: string
  dark: string
}

// ame-ui-philosophy スキル 4.2「1ポイントカラー（5プリセット）」準拠。
export const COLOR_PRESETS: readonly ColorPreset[] = [
  { id: 'trust-blue', light: '#005B99', dark: '#3B82C4' },
  { id: 'stable-green', light: '#2D6A4F', dark: '#4F8A6E' },
  { id: 'grounded-orange', light: '#C2410C', dark: '#DD6B3D' },
  { id: 'sophisticated-indigo', light: '#4338CA', dark: '#7C79E8' },
  { id: 'clarity-teal', light: '#0F766E', dark: '#2FA39A' },
]

export function getColorPreset(id: ColorPresetId): ColorPreset {
  return COLOR_PRESETS.find((preset) => preset.id === id) ?? COLOR_PRESETS[0]
}

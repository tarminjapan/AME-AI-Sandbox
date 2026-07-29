// テキストを含まない線画イラスト。currentColor でウィンドウ枠、
// var(--color-primary) でプロンプト/シールドを描画するため、
// テーマ・カラープリセット切替に自動追従する（文言が無いため言語/フォント切替の影響も受けない）。
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 320" fill="none" className={className} aria-hidden="true">
      {/* ターミナルウィンドウ */}
      <rect x="16" y="16" width="360" height="288" rx="16" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="64" x2="376" y2="64" stroke="currentColor" strokeWidth="2" />
      <circle cx="44" cy="40" r="5" fill="currentColor" />
      <circle cx="68" cy="40" r="5" fill="currentColor" />
      <circle cx="92" cy="40" r="5" fill="currentColor" />

      {/* プロンプト行 */}
      <path
        d="M48 112 L68 128 L48 144"
        stroke="var(--color-primary)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="84" y="122" width="120" height="10" rx="5" fill="var(--color-primary)" />

      {/* 出力行（テキストの代わりのバー） */}
      <rect x="48" y="176" width="220" height="10" rx="5" fill="currentColor" opacity="0.35" />
      <rect x="48" y="200" width="160" height="10" rx="5" fill="currentColor" opacity="0.35" />
      <rect x="48" y="224" width="190" height="10" rx="5" fill="currentColor" opacity="0.35" />

      {/* セキュリティ・バッジ (シールド) */}
      <g transform="translate(336,180)">
        <path
          d="M40 0 L80 14 L80 46 C80 74 60 92 40 100 C20 92 0 74 0 46 L0 14 Z"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <polyline
          points="22,48 36,62 60,34"
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

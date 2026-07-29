export type Locale = 'ja' | 'en'

export interface Strings {
  header: {
    logo: string
    github: string
  }
  hero: {
    title: string
    subtitle: string
    ctaGithub: string
    ctaQuickStart: string
  }
  problem: {
    heading: string
    body: string
  }
  architecture: {
    heading: string
    body: string
    host: string
    container: string
    cliClaude: string
    cliOpenCode: string
    cliAntigravity: string
  }
  techStack: {
    heading: string
  }
  features: {
    heading: string
    items: { title: string; body: string }[]
  }
  quickStart: {
    heading: string
    steps: { label: string; command: string }[]
  }
  cliTable: {
    heading: string
    colCli: string
    colCommand: string
    colAuth: string
    rows: { cli: string; command: string; auth: string }[]
  }
  security: {
    heading: string
    notes: string[]
  }
  related: {
    heading: string
    name: string
    body: string
  }
  footer: {
    license: string
    repo: string
    issues: string
  }
  settings: {
    menuLabel: string
    theme: string
    themeLight: string
    themeDark: string
    themeSystem: string
    font: string
    fontDefault: string
    fontSerif: string
    language: string
    color: string
    colorTrustBlue: string
    colorStableGreen: string
    colorGroundedOrange: string
    colorSophisticatedIndigo: string
    colorClarityTeal: string
  }
}

const ja: Strings = {
  header: {
    logo: 'AME-AI-Sandbox',
    github: 'GitHub',
  },
  hero: {
    title: 'AI コーディング CLI を、安全に。再現可能に。',
    subtitle:
      'Claude Code / OpenCode / Antigravity CLI を、ホスト環境を汚さず・鍵を漏らさず・いつでも同じ状態で動かすための開発用 Docker サンドボックスです。',
    ctaGithub: 'GitHub で見る',
    ctaQuickStart: 'クイックスタート',
  },
  problem: {
    heading: 'なぜサンドボックスが必要か',
    body: 'AI コーディング CLI はホストのファイルやシェルに直接アクセスできてしまいます。SSH 鍵や GitHub トークンをどう安全に渡すか、環境をどう毎回同じ状態に保つかは、使い始めるたびに悩む問題です。AME-AI-Sandbox は、この2点を最初から解決した状態で CLI を使い始められるようにします。',
  },
  architecture: {
    heading: '構成図',
    body: 'ホスト側の鍵やトークンはコンテナに焼き込まれず、実行時にのみ安全な経路で受け渡されます。',
    host: 'ホスト',
    container: 'Docker コンテナ',
    cliClaude: 'Claude Code',
    cliOpenCode: 'OpenCode',
    cliAntigravity: 'Antigravity CLI',
  },
  techStack: {
    heading: '技術スタック',
  },
  features: {
    heading: '主要機能',
    items: [
      {
        title: '3 CLI 対応',
        body: 'Claude Code / OpenCode / Antigravity CLI を、切り替え不要で同一コンテナ内から利用できます。',
      },
      {
        title: 'セキュアな認証運用',
        body: 'SSH 鍵はイメージに焼き込まず実行時に bind-mount。GH_TOKEN は credential helper 経由で動的に解決し、平文保存しません。',
      },
      {
        title: 'ファイル駆動の設定',
        body: 'すべての設定を .env / secrets/ から読み込みます。コマンド引数を都度指定する必要はありません。',
      },
      {
        title: '柔軟なネットワーク構成',
        body: 'Web サービスのポート公開は .env で bridge/host を切替可能。既定は 127.0.0.1 バインドのみで LAN への誤公開を防ぎます。',
      },
    ],
  },
  quickStart: {
    heading: 'クイックスタート',
    steps: [
      { label: '.env 作成', command: 'cp .env.example .env' },
      {
        label: 'sudo パスワードファイル作成',
        command: 'cp secrets/user_password.txt.example secrets/user_password.txt',
      },
      { label: 'イメージをビルド', command: 'docker compose build' },
      { label: 'コンテナを起動', command: 'docker compose up -d' },
      { label: 'コンテナに入る', command: 'docker compose exec sandbox bash' },
    ],
  },
  cliTable: {
    heading: '各 CLI の使い方',
    colCli: 'CLI',
    colCommand: '起動コマンド',
    colAuth: '認証方法',
    rows: [
      { cli: 'Claude Code', command: 'claude', auth: '対話ログイン、または ANTHROPIC_API_KEY 環境変数' },
      {
        cli: 'OpenCode',
        command: 'opencode',
        auth: 'opencode auth login（対話）、またはプロバイダごとの API キー環境変数',
      },
      {
        cli: 'Antigravity CLI',
        command: 'agy',
        auth: 'URL + ワンタイムコードによる対話認証、または ANTIGRAVITY_API_KEY 環境変数',
      },
      { cli: 'GitHub CLI', command: 'gh', auth: 'GH_TOKEN 環境変数で entrypoint 起動時に自動ログイン済み' },
    ],
  },
  security: {
    heading: 'セキュリティに関する注記',
    notes: [
      'SSH 鍵はビルド時にイメージへ焼き込まない。実行時にホストの鍵を読み取り専用で bind-mount する。',
      'GitHub のホスト鍵は ssh-keyscan で known_hosts に登録済み。検証無効化は行わない。',
      'GH_TOKEN は環境変数として渡され、gh の credential helper が動的に解決する。平文ファイルには保存しない。',
      'sudo パスワードは BuildKit の secret mount 機構でビルド時にのみ渡され、イメージには一切残らない。',
    ],
  },
  related: {
    heading: '関連プロジェクト',
    name: 'AME-AI-Review-System',
    body: '本リポジトリの開発フローで使っている Dual-Gate 方式の AI コードレビュー基盤（サンドボックス本体とは別プロジェクト）。移植元リポジトリはこちらです。',
  },
  footer: {
    license: 'MIT License',
    repo: 'リポジトリ',
    issues: 'Issues',
  },
  settings: {
    menuLabel: '表示設定',
    theme: 'テーマ',
    themeLight: 'ライト',
    themeDark: 'ダーク',
    themeSystem: 'システム',
    font: 'フォント',
    fontDefault: 'デフォルト',
    fontSerif: '明朝体',
    language: '言語',
    color: 'カラー',
    colorTrustBlue: 'Trust Blue',
    colorStableGreen: 'Stable Green',
    colorGroundedOrange: 'Grounded Orange',
    colorSophisticatedIndigo: 'Sophisticated Indigo',
    colorClarityTeal: 'Clarity Teal',
  },
}

const en: Strings = {
  header: {
    logo: 'AME-AI-Sandbox',
    github: 'GitHub',
  },
  hero: {
    title: 'AI coding CLIs. Sandboxed. Reproducible.',
    subtitle:
      'A development Docker sandbox for running Claude Code, OpenCode, and Antigravity CLI without touching your host, leaking secrets, or drifting from a known-good state.',
    ctaGithub: 'View on GitHub',
    ctaQuickStart: 'Quick Start',
  },
  problem: {
    heading: 'Why a sandbox',
    body: 'AI coding CLIs can reach your host files and shell directly. Safely passing SSH keys and GitHub tokens, and keeping the environment reproducible every time, are problems you rethink every time you start using one. AME-AI-Sandbox solves both from the start.',
  },
  architecture: {
    heading: 'Architecture',
    body: 'Host-side keys and tokens are never baked into the container image — they are only passed through a secure path at runtime.',
    host: 'Host',
    container: 'Docker container',
    cliClaude: 'Claude Code',
    cliOpenCode: 'OpenCode',
    cliAntigravity: 'Antigravity CLI',
  },
  techStack: {
    heading: 'Tech stack',
  },
  features: {
    heading: 'Key features',
    items: [
      {
        title: 'Three CLIs, one container',
        body: 'Use Claude Code, OpenCode, and Antigravity CLI from the same container without switching setups.',
      },
      {
        title: 'Secure credentials',
        body: 'SSH keys are bind-mounted at runtime, never baked into the image. GH_TOKEN resolves dynamically via the gh credential helper and is never stored in plaintext.',
      },
      {
        title: 'File-driven configuration',
        body: 'Every setting is read from .env / secrets/. No need to pass command-line arguments each time.',
      },
      {
        title: 'Flexible networking',
        body: 'Switch web service port exposure between bridge/host mode via .env. The default binds only to 127.0.0.1 to prevent accidental LAN exposure.',
      },
    ],
  },
  quickStart: {
    heading: 'Quick start',
    steps: [
      { label: 'Create .env', command: 'cp .env.example .env' },
      {
        label: 'Create the sudo password file',
        command: 'cp secrets/user_password.txt.example secrets/user_password.txt',
      },
      { label: 'Build the image', command: 'docker compose build' },
      { label: 'Start the container', command: 'docker compose up -d' },
      { label: 'Enter the container', command: 'docker compose exec sandbox bash' },
    ],
  },
  cliTable: {
    heading: 'Using each CLI',
    colCli: 'CLI',
    colCommand: 'Command',
    colAuth: 'Authentication',
    rows: [
      { cli: 'Claude Code', command: 'claude', auth: 'Interactive login, or the ANTHROPIC_API_KEY variable' },
      {
        cli: 'OpenCode',
        command: 'opencode',
        auth: 'opencode auth login (interactive), or a provider-specific API key variable',
      },
      {
        cli: 'Antigravity CLI',
        command: 'agy',
        auth: 'Interactive URL + one-time-code login, or the ANTIGRAVITY_API_KEY variable',
      },
      { cli: 'GitHub CLI', command: 'gh', auth: 'Already logged in at entrypoint via the GH_TOKEN variable' },
    ],
  },
  security: {
    heading: 'Security notes',
    notes: [
      'SSH keys are never baked into the image at build time. The host key is bind-mounted read-only at runtime.',
      "GitHub's host key is pre-registered in known_hosts via ssh-keyscan. Host key checking is never disabled.",
      'GH_TOKEN is passed as an environment variable and resolved dynamically by the gh credential helper — never stored in a plaintext file.',
      'The sudo password is passed only at build time via a BuildKit secret mount and never persists in the image.',
    ],
  },
  related: {
    heading: 'Related project',
    name: 'AME-AI-Review-System',
    body: "The dual-gate AI code review system used for this repository's own development workflow (a separate project from the sandbox itself). This is the source repository it was ported from.",
  },
  footer: {
    license: 'MIT License',
    repo: 'Repository',
    issues: 'Issues',
  },
  settings: {
    menuLabel: 'Display settings',
    theme: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeSystem: 'System',
    font: 'Font',
    fontDefault: 'Default',
    fontSerif: 'Serif',
    language: 'Language',
    color: 'Color',
    colorTrustBlue: 'Trust Blue',
    colorStableGreen: 'Stable Green',
    colorGroundedOrange: 'Grounded Orange',
    colorSophisticatedIndigo: 'Sophisticated Indigo',
    colorClarityTeal: 'Clarity Teal',
  },
}

export const TRANSLATIONS: Record<Locale, Strings> = { ja, en }

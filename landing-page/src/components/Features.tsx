const FEATURES = [
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
  {
    title: 'Dual-Gate AI コードレビュー',
    body: 'pre-commit のローカルゲートと、PR コメントで起動する CI ゲートの二段構成で品質を担保します。',
  },
  {
    title: '超厳格な静的解析',
    body: 'Dockerfile に対して hadolint と trivy config を適用。info レベルの指摘も失敗扱いにしています。',
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">主要機能</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

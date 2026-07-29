const NOTES = [
  'SSH 鍵はビルド時にイメージへ焼き込まない。実行時にホストの鍵を読み取り専用で bind-mount する。',
  'GitHub のホスト鍵は ssh-keyscan で known_hosts に登録済み。検証無効化は行わない。',
  'GH_TOKEN は環境変数として渡され、gh の credential helper が動的に解決する。平文ファイルには保存しない。',
  'sudo パスワードは BuildKit の secret mount 機構でビルド時にのみ渡され、イメージには一切残らない。',
]

export function SecurityNotes() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">セキュリティに関する注記</h2>
      <ul className="mt-6 flex flex-col gap-3">
        {NOTES.map((note) => (
          <li key={note} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

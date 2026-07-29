const ROWS = [
  { cli: 'Claude Code', command: 'claude', auth: '対話ログイン、または ANTHROPIC_API_KEY 環境変数' },
  { cli: 'OpenCode', command: 'opencode', auth: 'opencode auth login（対話）、またはプロバイダごとの API キー環境変数' },
  {
    cli: 'Antigravity CLI',
    command: 'agy',
    auth: 'URL + ワンタイムコードによる対話認証、または ANTIGRAVITY_API_KEY 環境変数',
  },
  { cli: 'GitHub CLI', command: 'gh', auth: 'GH_TOKEN 環境変数で entrypoint 起動時に自動ログイン済み' },
]

export function CliTable() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">各 CLI の使い方</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-2xl text-left text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2 pr-6 font-medium whitespace-nowrap">CLI</th>
              <th className="py-2 pr-6 font-medium whitespace-nowrap">起動コマンド</th>
              <th className="py-2 font-medium whitespace-nowrap">認証方法</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.cli} className="border-t border-gray-100 dark:border-gray-800">
                <td className="py-3 pr-6 font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">
                  {row.cli}
                </td>
                <td className="py-3 pr-6 whitespace-nowrap">
                  <code className="font-mono text-gray-600 dark:text-gray-400">{row.command}</code>
                </td>
                <td className="py-3 text-gray-600 dark:text-gray-400">{row.auth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const STEPS = [
  { label: '.env 作成', command: 'cp .env.example .env' },
  { label: 'sudo パスワードファイル作成', command: 'cp secrets/user_password.txt.example secrets/user_password.txt' },
  { label: 'イメージをビルド', command: 'docker compose build' },
  { label: 'コンテナを起動', command: 'docker compose up -d' },
  { label: 'コンテナに入る', command: 'docker compose exec sandbox bash' },
]

export function QuickStart() {
  return (
    <section id="quick-start" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">クイックスタート</h2>
      <ol className="mt-6 flex flex-col gap-4">
        {STEPS.map((step, index) => (
          <li key={step.command} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {index + 1}. {step.label}
            </span>
            <code className="rounded-md bg-gray-50 px-4 py-2 font-mono text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {step.command}
            </code>
          </li>
        ))}
      </ol>
    </section>
  )
}

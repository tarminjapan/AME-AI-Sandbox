export function ProblemStatement() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">なぜサンドボックスが必要か</h2>
      <p className="mt-4 max-w-prose text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        AI コーディング CLI はホストのファイルやシェルに直接アクセスできてしまいます。SSH
        鍵や GitHub トークンをどう安全に渡すか、環境をどう毎回同じ状態に保つかは、使い始めるたびに悩む問題です。
        AME-AI-Sandbox は、この2点を最初から解決した状態で CLI を使い始められるようにします。
      </p>
    </section>
  )
}

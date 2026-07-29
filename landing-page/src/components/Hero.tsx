export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-16 pb-16">
      <h1 className="max-w-2xl text-3xl font-bold text-gray-900 sm:text-4xl dark:text-gray-100">
        AI コーディング CLI を、安全に。再現可能に。
      </h1>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-gray-600 dark:text-gray-400">
        Claude Code / OpenCode / Antigravity CLI を、ホスト環境を汚さず・鍵を漏らさず・いつでも同じ状態で動かすための開発用
        Docker サンドボックスです。
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="https://github.com/tarminjapan/AME-AI-Sandbox"
          className="rounded-md bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors duration-200 ease-out hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]"
        >
          GitHub で見る
        </a>
        <a
          href="#quick-start"
          className="rounded-md px-6 py-3 text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:text-gray-300 dark:hover:text-gray-100"
        >
          クイックスタート
        </a>
      </div>
    </section>
  )
}

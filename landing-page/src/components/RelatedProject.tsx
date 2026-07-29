export function RelatedProject() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">関連プロジェクト</h2>
      <a
        href="https://github.com/tarminjapan/AME-AI-Review-System"
        className="mt-6 block rounded-lg bg-gray-50 p-6 transition-colors duration-200 ease-out hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:bg-gray-800 dark:hover:bg-gray-800/70"
      >
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">AME-AI-Review-System</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          本サンドボックスに組み込まれた Dual-Gate 方式の AI コードレビュー基盤。移植元リポジトリはこちらです。
        </p>
      </a>
    </section>
  )
}

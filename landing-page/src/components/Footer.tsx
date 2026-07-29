export function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-6 py-16">
      <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
        <span>MIT License</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/tarminjapan/AME-AI-Sandbox"
            className="transition-colors duration-200 ease-out hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:hover:text-gray-100"
          >
            リポジトリ
          </a>
          <a
            href="https://github.com/tarminjapan/AME-AI-Sandbox/issues"
            className="transition-colors duration-200 ease-out hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:hover:text-gray-100"
          >
            Issues
          </a>
        </div>
      </div>
    </footer>
  )
}

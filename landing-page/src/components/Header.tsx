export function Header() {
  return (
    <header className="mx-auto max-w-4xl px-6 pt-8">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          AME-AI-Sandbox
        </span>
        <a
          href="https://github.com/tarminjapan/AME-AI-Sandbox"
          className="rounded-md px-3 py-2 text-sm font-normal text-gray-600 transition-colors duration-200 ease-out hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] dark:text-gray-400 dark:hover:text-gray-100"
        >
          GitHub
        </a>
      </div>
    </header>
  )
}

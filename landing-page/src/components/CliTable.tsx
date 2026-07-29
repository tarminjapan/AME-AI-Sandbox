import { useSettings } from '../settings/SettingsContext'

export function CliTable() {
  const { t } = useSettings()
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.cliTable.heading}</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-2xl text-left text-sm">
          <thead>
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="py-2 pr-6 font-medium whitespace-nowrap">{t.cliTable.colCli}</th>
              <th className="py-2 pr-6 font-medium whitespace-nowrap">{t.cliTable.colCommand}</th>
              <th className="py-2 font-medium whitespace-nowrap">{t.cliTable.colAuth}</th>
            </tr>
          </thead>
          <tbody>
            {t.cliTable.rows.map((row) => (
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

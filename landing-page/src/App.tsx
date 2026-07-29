import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProblemStatement } from './components/ProblemStatement'
import { TechStack } from './components/TechStack'
import { Features } from './components/Features'
import { QuickStart } from './components/QuickStart'
import { CliTable } from './components/CliTable'
import { SecurityNotes } from './components/SecurityNotes'
import { RelatedProject } from './components/RelatedProject'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
        <ProblemStatement />
        <TechStack />
        <Features />
        <QuickStart />
        <CliTable />
        <SecurityNotes />
        <RelatedProject />
      </main>
      <Footer />
    </div>
  )
}

export default App

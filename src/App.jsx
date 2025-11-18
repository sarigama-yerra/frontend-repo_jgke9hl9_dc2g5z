import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Walkthrough from './components/Walkthrough'

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top navigation */}
      <Navbar />

      {/* Hero with Spline cover */}
      <Hero />

      {/* Features grid */}
      <Features />

      {/* Interactive walkthrough */}
      <Walkthrough />

      {/* Simple footer */}
      <footer className="mt-16 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-white/60">© {new Date().getFullYear()} Flames Blue Bank. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white">Terms</a>
              <a href="#" className="text-white/60 hover:text-white">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

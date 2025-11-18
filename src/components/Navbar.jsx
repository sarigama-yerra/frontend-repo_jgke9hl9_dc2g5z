import { Menu } from "lucide-react";

function Navbar() {
  return (
    <header className="relative z-20 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-white/90 backdrop-blur text-slate-900 flex items-center justify-center font-bold shadow-sm">
              FB
            </div>
            <span className="text-white/90 font-semibold tracking-tight">Flames Blue Bank</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a className="text-white/70 hover:text-white transition" href="#features">Features</a>
            <a className="text-white/70 hover:text-white transition" href="#pricing">Pricing</a>
            <a className="text-white/70 hover:text-white transition" href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex px-4 py-2 rounded-xl text-white/80 hover:text-white transition">
              Sign in
            </button>
            <button className="inline-flex px-4 py-2 rounded-xl bg-white text-slate-900 font-medium shadow-sm hover:shadow transition">
              Get started
            </button>
            <button className="md:hidden text-white/80 hover:text-white" aria-label="Open menu">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

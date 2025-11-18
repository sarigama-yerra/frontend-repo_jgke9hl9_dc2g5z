import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <section className="relative h-[76vh] min-h-[520px] w-full overflow-hidden">
      {/* Spline 3D background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/20 to-slate-900" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(15,23,42,0)_0%,rgba(15,23,42,0.3)_60%,rgba(15,23,42,0.85)_100%)]" />

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 ring-1 ring-white/20 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Now supporting Visa virtual cards
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              A new way of banking for small and medium businesses
            </h1>
            <p className="mt-4 text-base text-white/80 sm:text-lg md:text-xl">
              Modern finance tools to send, spend, and manage money across your team — with cards, accounts, and controls built for high‑growth companies.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-slate-900 font-medium shadow-sm hover:shadow transition">
                Open business account
              </button>
              <button className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-white/85 ring-1 ring-white/25 hover:bg-white/10 transition">
                Book a demo
              </button>
            </div>
            <p className="mt-6 text-xs text-white/60">
              FDIC insured up to $250,000 • No monthly fees • Set custom spend limits
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

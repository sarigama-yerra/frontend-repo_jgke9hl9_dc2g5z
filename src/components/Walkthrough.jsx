import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, CreditCard, LineChart, ShieldCheck, CheckCircle2, Hand } from 'lucide-react'

const steps = [
  {
    key: 'account',
    title: 'Open your business account',
    caption: 'Sign up in minutes with instant KYB checks and smart onboarding.',
    icon: Sparkles,
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    key: 'card',
    title: 'Issue virtual & physical cards',
    caption: 'Spin up budget-locked cards for teams, vendors, or campaigns.',
    icon: CreditCard,
    accent: 'from-fuchsia-400 to-pink-500',
  },
  {
    key: 'analytics',
    title: 'See spend in real time',
    caption: 'Live insights, alerts, and export-ready reporting.',
    icon: LineChart,
    accent: 'from-emerald-400 to-teal-500',
  },
]

export default function Walkthrough() {
  const [current, setCurrent] = useState(0)
  const step = steps[current]

  const next = () => setCurrent((i) => (i + 1) % steps.length)
  const prev = () => setCurrent((i) => (i - 1 + steps.length) % steps.length)

  const accentClass = useMemo(() => step.accent, [step])

  return (
    <section className="relative z-10 mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Interactive walkthrough
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Try it. No signup needed.</h2>
          <p className="mt-3 max-w-2xl text-white/70">Play with the demo below — drag the card, click the controls, and step through a real flow.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button onClick={prev} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Previous</button>
          <button onClick={next} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-3 py-2 text-sm text-white shadow-md shadow-black/20 hover:opacity-95 transition-colors duration-200 from-blue-600 to-violet-600">
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Interactive canvas */}
        <InteractiveCanvas current={current} accentClass={accentClass} onComplete={next} />

        {/* Stepper */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
          <ol className="space-y-3">
            {steps.map((s, idx) => (
              <li key={s.key}>
                <button
                  onClick={() => setCurrent(idx)}
                  className={`group flex w-full items-start gap-4 rounded-xl p-3 text-left transition hover:bg-white/5 ${idx === current ? 'bg-white/5 ring-1 ring-white/10' : ''}`}
                >
                  <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${s.accent} text-white shadow-md shadow-black/30`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium text-white">{s.title}</p>
                      {idx < current && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-white/70">{s.caption}</p>
                  </div>
                  <span className={`mt-1 hidden rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/90 sm:inline ${idx === current ? 'bg-gradient-to-r ' + s.accent : 'bg-white/10'}`}>{idx === current ? 'Active' : 'Step ' + (idx + 1)}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex items-center justify-between">
            <div className="h-2 w-full rounded-full bg-white/10">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${accentClass}`}
                initial={{ width: 0 }}
                animate={{ width: `${((current + 1) / steps.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              />
            </div>
            <div className="ml-4 hidden gap-2 sm:flex">
              <button onClick={prev} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10">Back</button>
              <button onClick={next} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-3 py-2 text-sm text-white shadow-md shadow-black/20 hover:opacity-95 transition-colors duration-200 from-blue-600 to-violet-600">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InteractiveCanvas({ current, accentClass, onComplete }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-800/60 to-slate-900 p-4 sm:p-6">
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.06),transparent_60%)]" />

      <AnimatePresence mode="popLayout">
        {current === 0 && (
          <AccountDemo key="account" accentClass={accentClass} onComplete={onComplete} />
        )}
        {current === 1 && (
          <CardDemo key="card" accentClass={accentClass} onComplete={onComplete} />
        )}
        {current === 2 && (
          <AnalyticsDemo key="analytics" accentClass={accentClass} onComplete={onComplete} />
        )}
      </AnimatePresence>
    </div>
  )
}

function AccountDemo({ accentClass, onComplete }) {
  const [email, setEmail] = useState('finch@acme.co')
  const [submitted, setSubmitted] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="grid gap-6 md:grid-cols-2"
    >
      <div>
        <h3 className="text-xl font-semibold text-white">Create your account</h3>
        <p className="mt-2 text-white/70">Instant verification with KYB — we do the heavy lifting so you can get back to business.</p>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <label className="text-xs uppercase tracking-wide text-white/60">Business email</label>
          <div className="mt-2 flex items-center gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/20"
              placeholder="you@company.com"
            />
            <button
              onClick={() => { setSubmitted(true); setTimeout(onComplete, 800) }}
              className={`shrink-0 rounded-lg bg-gradient-to-r ${accentClass} px-3 py-2 text-sm text-white shadow-md shadow-black/20 hover:opacity-95`}
            >
              Start
            </button>
          </div>
          <AnimatePresence>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-300"
              >
                <CheckCircle2 className="h-4 w-4" />
                Verified — welcome aboard!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative">
        <DemoCard accentClass={accentClass} hint="Tap to verify">
          <ShieldCheck className="h-5 w-5 text-emerald-300" />
          <span className="text-sm text-white/90">KYB passed</span>
        </DemoCard>
      </div>
    </motion.div>
  )
}

function CardDemo({ accentClass, onComplete }) {
  const [revealed, setRevealed] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="grid gap-6 md:grid-cols-2"
    >
      <div>
        <h3 className="text-xl font-semibold text-white">Issue a virtual card</h3>
        <p className="mt-2 text-white/70">Drag the card into the slot to activate it. Budgets and vendor locks included.</p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => { setRevealed(false); setTimeout(() => setPos({ x: 0, y: 0 }), 100) }}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            Reset
          </button>
          <button
            onClick={() => { setRevealed(true); setTimeout(onComplete, 800) }}
            className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${accentClass} px-3 py-2 text-sm text-white shadow-md shadow-black/20 hover:opacity-95`}
          >
            Auto-complete <Sparkles className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="relative mx-auto mt-2 h-56 w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05),transparent_60%)]" />
          <div className="absolute inset-x-10 bottom-6 h-10 rounded-xl border border-white/10 bg-slate-900/70" />

          <motion.div
            drag
            dragConstraints={{ left: -60, right: 60, top: -20, bottom: 80 }}
            dragElastic={0.15}
            onDragEnd={(e, info) => {
              const withinSlot = info.point.y > 240 && Math.abs(info.point.x - (window.innerWidth / 2)) < 180
              if (withinSlot) {
                setRevealed(true)
                setTimeout(onComplete, 800)
              }
            }}
            style={{ x: pos.x, y: pos.y }}
            className={`absolute left-1/2 top-6 h-32 w-56 -translate-x-1/2 cursor-grab active:cursor-grabbing rounded-2xl bg-gradient-to-br ${accentClass} p-4 shadow-xl shadow-black/40`}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-white/90">Flames Blue</div>
              <CreditCard className="h-5 w-5 text-white/90" />
            </div>
            <div className="mt-5 text-lg tracking-widest text-white/90">•••• 7289</div>
            <div className="mt-6 flex items-center justify-between text-xs text-white/85">
              <span>VALID 12/28</span>
              <span>VIRTUAL</span>
            </div>
          </motion.div>

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute inset-x-6 bottom-14 flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 px-4 py-2 text-emerald-200"
              >
                <CheckCircle2 className="h-4 w-4" /> Card activated!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function AnalyticsDemo({ accentClass, onComplete }) {
  const [hovered, setHovered] = useState(false)
  const [value, setValue] = useState(64)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="grid gap-6 md:grid-cols-2"
    >
      <div>
        <h3 className="text-xl font-semibold text-white">Real‑time analytics</h3>
        <p className="mt-2 text-white/70">Hover the chart to scrub. Click the handle to project spend and generate an alert.</p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => { setValue(90); setTimeout(onComplete, 800) }}
            className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${accentClass} px-3 py-2 text-sm text-white shadow-md shadow-black/20 hover:opacity-95`}
          >
            Trigger alert <ShieldCheck className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="relative mx-auto mt-2 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04),transparent_60%)]" />
          <Chart hovered={hovered} setHovered={setHovered} value={value} setValue={setValue} accentClass={accentClass} />
          <AnimatePresence>
            {value >= 85 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-rose-500/15 px-3 py-2 text-sm text-rose-200"
              >
                <Hand className="h-4 w-4" /> Alert: Projected overspend detected
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function Chart({ hovered, setHovered, value, setValue, accentClass }) {
  const points = Array.from({ length: 16 }, (_, i) => {
    const x = i
    const base = 40 + Math.sin(i / 2) * 10
    return { x, y: base }
  })

  const projected = value

  return (
    <div className="select-none">
      <div className="flex items-center justify-between text-xs text-white/60">
        <span>Spend</span>
        <span>Real‑time</span>
      </div>
      <div className="mt-3 h-36 w-full rounded-lg bg-slate-900/60 p-3">
        <div className="relative h-full w-full">
          {/* grid */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 opacity-20">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-white/5" />
            ))}
          </div>

          {/* line */}
          <svg viewBox="0 0 150 80" className="absolute inset-0 h-full w-full">
            <polyline
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              points={points.map(p => `${(p.x/15)*150},${80 - p.y}`).join(' ')}
            />
          </svg>

          {/* projected */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 rounded-full bg-gradient-to-r ${accentClass}`}
            initial={{ width: '0%' }}
            animate={{ width: `${projected}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          />

          {/* handle */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 280 }}
            dragElastic={0.05}
            onDragStart={() => setHovered(true)}
            onDragEnd={() => setHovered(false)}
            onDrag={(e, info) => {
              const w = 280
              const x = Math.max(0, Math.min(info.point.x - info.target.getBoundingClientRect().left, w))
              const pct = Math.round((x / w) * 100)
              setValue(Math.max(10, Math.min(100, pct)))
            }}
            className={`absolute -top-2 left-0 h-6 w-6 rounded-full border border-white/20 bg-gradient-to-br ${accentClass} shadow-md shadow-black/40`}
            style={{ x: `${projected}%` }}
          />

          {/* tooltip */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute -top-9 left-0 rounded-md border border-white/10 bg-slate-900/90 px-2 py-1 text-xs text-white/90 backdrop-blur"
                style={{ transform: `translateX(${projected}%)` }}
              >
                Projection: {projected}%
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function DemoCard({ accentClass, hint, children }) {
  const [tapped, setTapped] = useState(false)

  return (
    <div className="relative mx-auto mt-2 w-full max-w-sm">
      <motion.div
        whileHover={{ rotate: -1, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setTapped(true)}
        className={`relative h-40 w-full overflow-hidden rounded-2xl bg-gradient-to-br ${accentClass} p-4 shadow-xl shadow-black/40`}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-white/90">Flames Blue</div>
          <CreditCard className="h-5 w-5 text-white/90" />
        </div>
        <div className="mt-4 text-xl tracking-widest text-white/90">•••• 7289</div>
        <div className="mt-6 flex items-center justify-between text-xs text-white/85">
          <span>BUSINESS</span>
          <span>VISA</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: tapped ? 1 : 0 }}
          className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20 backdrop-blur-sm"
        >
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-200">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </div>
        </motion.div>
      </motion.div>
      {!tapped && (
        <div className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/70">
          {hint}
        </div>
      )}
    </div>
  )
}

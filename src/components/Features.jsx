import { Shield, CreditCard, LineChart, Users } from "lucide-react";

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
        <Icon size={20} />
      </div>
      <h3 className="text-white font-medium">{title}</h3>
      <p className="mt-2 text-sm text-white/70">{desc}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="relative z-10 -mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature icon={CreditCard} title="Virtual & physical cards" desc="Issue smart cards in seconds. Control spend by merchant, amount, and time." />
          <Feature icon={LineChart} title="Real‑time analytics" desc="See every transaction as it happens. Spot trends and optimize cash flow." />
          <Feature icon={Shield} title="Advanced security" desc="Multi‑factor auth, tokenization, and continuous monitoring keep funds safe." />
          <Feature icon={Users} title="Team controls" desc="Set budgets, approvals, and roles so everyone has what they need — securely." />
        </div>
      </div>
    </section>
  );
}

export default Features;

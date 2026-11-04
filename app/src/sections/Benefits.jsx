
import {
  Brain,
  PiggyBank,
  Eye,
  Clock,
  Target,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Make Smarter Decisions",
      description:
        "Use meaningful financial summaries to understand your money and make informed spending decisions.",
      color: "violet",
    },
    {
      icon: PiggyBank,
      title: "Build Better Saving Habits",
      description:
        "Monitor your income and expenses to identify opportunities to save more money every month.",
      color: "emerald",
    },
    {
      icon: Eye,
      title: "Get Financial Clarity",
      description:
        "See where your money goes through organized transactions and easy-to-understand reports.",
      color: "blue",
    },
    {
      icon: Clock,
      title: "Save Time",
      description:
        "Manage your financial records from one place instead of maintaining scattered manual records.",
      color: "orange",
    },
    {
      icon: Target,
      title: "Stay Focused on Goals",
      description:
        "Set financial targets and regularly review your progress towards better money management.",
      color: "pink",
    },
    {
      icon: ShieldCheck,
      title: "Stay Organized",
      description:
        "Keep your financial history structured and accessible with a consistent transaction management system.",
      color: "cyan",
    },
  ];

  const colorStyles = {
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    orange: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  };

  const highlights = [
    "Understand your spending patterns",
    "Keep income and expenses organized",
    "Review your financial progress",
    "Make more informed money decisions",
  ];

  return (
    <section
      id="benefits"
      className="relative overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles size={16} />
            Why ExpenseFlow
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Small Steps Today,
            <span className="block bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              Better Finances Tomorrow.
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
            Good financial habits start with understanding your money.
            ExpenseFlow helps make that process simpler and more organized.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:bg-white hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-slate-950/50 dark:hover:border-violet-500/40 dark:hover:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorStyles[benefit.color]} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>

                  <span className="text-sm font-bold text-slate-300 dark:text-slate-700">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Panel */}
        <div className="mt-12 grid items-center gap-10 overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-8 sm:p-10 lg:grid-cols-2 dark:border-violet-500/20 dark:from-violet-500/10 dark:via-slate-900 dark:to-blue-500/10">

          <div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
              <Sparkles size={16} />
              Better Financial Habits
            </span>

            <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl dark:text-white">
              Take the first step towards financial confidence.
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
              You don't need complicated spreadsheets to understand your
              finances. Start with organized records, review your activity
              and improve one step at a time.
            </p>

            <a
              href="#cta"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-1"
            >
              Start Managing Money
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="rounded-2xl border border-white/80 bg-white/80 p-6 shadow-xl shadow-violet-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80">
            <h4 className="mb-6 font-bold text-slate-900 dark:text-white">
              Your Financial Checklist
            </h4>

            <div className="space-y-5">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={18} />
                  </div>

                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;


import {
  PlusCircle,
  LayoutDashboard,
  ChartPie,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Add Your Transactions",
      description:
        "Record your daily income and expenses. Add an amount, category, date and description to keep your financial records organized.",
      icon: PlusCircle,
      points: [
        "Add income and expenses",
        "Choose transaction categories",
        "Maintain a transaction history",
      ],
      color: "violet",
    },
    {
      number: "02",
      title: "Track Your Money",
      description:
        "View your financial activity through a simple dashboard. Understand your total balance, income and expenses.",
      icon: LayoutDashboard,
      points: [
        "View your financial summary",
        "Monitor monthly transactions",
        "Check your available balance",
      ],
      color: "blue",
    },
    {
      number: "03",
      title: "Analyze & Improve",
      description:
        "Use visual reports and category-wise summaries to understand spending patterns and make informed decisions.",
      icon: ChartPie,
      points: [
        "Analyze spending categories",
        "Compare income and expenses",
        "Build better money habits",
      ],
      color: "emerald",
    },
  ];

  const colorStyles = {
    violet: {
      icon: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
      number: "text-violet-600 dark:text-violet-400",
      line: "bg-violet-500",
    },
    blue: {
      icon: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      number: "text-blue-600 dark:text-blue-400",
      line: "bg-blue-500",
    },
    emerald: {
      icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      number: "text-emerald-600 dark:text-emerald-400",
      line: "bg-emerald-500",
    },
  };

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-white py-24 dark:bg-slate-900"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles size={16} />
            Simple Process
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            How ExpenseFlow
            <span className="block bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              Works.
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
            Managing your personal finances doesn't have to be complicated.
            Follow three simple steps to get started.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const styles = colorStyles[step.color];

            return (
              <div key={step.number} className="relative">

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(100%+1rem)] top-12 hidden h-px w-8 border-t-2 border-dashed border-slate-300 lg:block dark:border-white/20" />
                )}

                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-violet-500/40">

                  <div className="flex items-center justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${styles.icon}`}>
                      <Icon size={27} />
                    </div>

                    <span className={`text-4xl font-extrabold ${styles.number}`}>
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>

                  <div className="my-7 h-px bg-slate-200 dark:bg-white/10" />

                  <ul className="space-y-4">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
                      >
                        <CheckCircle2
                          size={17}
                          className={styles.number}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Your journey towards smarter money management starts here.
          </p>

          <a
            href="#cta"
            className="inline-flex items-center gap-2 font-semibold text-violet-600 transition hover:gap-3 dark:text-violet-400"
          >
            Start Your Journey
            <ArrowRight size={17} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;

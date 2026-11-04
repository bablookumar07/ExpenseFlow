
import {
  Receipt,
  Wallet,
  ChartNoAxesCombined,
  Tags,
  Target,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Receipt,
      title: "Smart Expense Tracking",
      description:
        "Record and organize your daily expenses with ease. Keep every transaction accessible in one place.",
      color: "violet",
    },
    {
      icon: Wallet,
      title: "Income Management",
      description:
        "Track your income sources and understand how much money you earn over different periods.",
      color: "emerald",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Visual Analytics",
      description:
        "Understand your financial patterns through clear charts, summaries and meaningful insights.",
      color: "blue",
    },
    {
      icon: Tags,
      title: "Category-wise Reports",
      description:
        "Organize transactions into categories and identify where most of your money goes.",
      color: "orange",
    },
    {
      icon: Target,
      title: "Budget Planning",
      description:
        "Set monthly spending targets, monitor your progress and develop better financial habits.",
      color: "pink",
    },
    {
      icon: ShieldCheck,
      title: "Secure Data Management",
      description:
        "Keep your financial records organized with secure backend validation and reliable data handling.",
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

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles size={16} />
            Powerful Features
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Everything You Need
            <span className="block bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              To Manage Your Money.
            </span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-400">
            Simple tools and useful insights to help you track spending,
            manage income and make smarter financial decisions.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-slate-900 dark:hover:border-violet-500/40"
              >
                {/* Decorative Number */}
                <span className="absolute right-6 top-5 text-4xl font-bold text-slate-100 transition-colors group-hover:text-violet-100 dark:text-white/[0.04] dark:group-hover:text-violet-500/10">
                  0{index + 1}
                </span>

                <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[feature.color]} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon size={26} />
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-violet-600 transition-all group-hover:gap-3 dark:text-violet-400">
                  Explore Feature
                  <ArrowUpRight size={16} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 rounded-3xl border border-violet-200/60 bg-gradient-to-r from-violet-50 to-blue-50 p-8 text-center dark:border-violet-500/20 dark:from-violet-500/10 dark:to-blue-500/10 sm:p-10">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ready to take control of your finances?
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400">
            Start tracking your money and build a clearer picture of your
            financial future.
          </p>

          <a
            href="#cta"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-1 hover:shadow-violet-500/40"
          >
            Get Started
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;

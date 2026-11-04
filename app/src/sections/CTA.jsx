
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

const CTA = () => {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-white px-5 py-24 dark:bg-slate-900 sm:px-8 lg:px-10"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-700 via-purple-700 to-blue-700 px-6 py-16 shadow-2xl shadow-violet-500/20 sm:px-12 lg:px-16 lg:py-20">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border-[40px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-purple-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Sparkles size={16} />
            Start Your Financial Journey
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your Money Deserves
            <span className="block text-violet-200">
              Better Management.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-violet-100 sm:text-lg">
            Take control of your income, track your expenses and build
            healthier financial habits with ExpenseFlow.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#home"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 font-semibold text-violet-700 shadow-xl transition hover:-translate-y-1 hover:bg-violet-50"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20"
            >
              Explore Features
            </a>
          </div>

          {/* Highlights */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-violet-100">
            <span className="flex items-center gap-2">
              <Wallet size={17} />
              Simple Tracking
            </span>

            <span className="flex items-center gap-2">
              <TrendingUp size={17} />
              Financial Insights
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck size={17} />
              Organized Records
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

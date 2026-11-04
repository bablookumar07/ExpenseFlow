
import { useState } from "react";
import { Plus, Minus, MessageCircle, Sparkles } from "lucide-react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "What is ExpenseFlow?",
      answer:
        "ExpenseFlow is a personal finance tracking application that helps you record income, manage expenses, monitor your balance and understand your spending habits through visual reports.",
    },
    {
      question: "Is ExpenseFlow free to use?",
      answer:
        "ExpenseFlow is being developed as a personal finance management project. Its initial version is intended to provide the core expense and income tracking features.",
    },
    {
      question: "Can I track both income and expenses?",
      answer:
        "Yes. You can maintain separate income and expense transactions, organize them by category and review your financial activity.",
    },
    {
      question: "Can I see monthly financial reports?",
      answer:
        "Yes. The application is designed to support monthly transaction filtering, category-wise expense summaries and visual financial analytics.",
    },
    {
      question: "Is my financial data secure?",
      answer:
        "ExpenseFlow uses backend validation and structured database operations. Security measures will be applied as the application develops. Avoid entering sensitive banking credentials or card information.",
    },
    {
      question: "Can I use ExpenseFlow on mobile devices?",
      answer:
        "The landing page is being designed to work across desktop, tablet and mobile screen sizes. The application dashboard will also be optimized for smaller screens.",
    },
    {
      question: "Does ExpenseFlow automatically connect to my bank?",
      answer:
        "No. The current project is designed for manually adding and managing transactions. Automatic bank integration is not part of the current scope.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex((previousIndex) =>
      previousIndex === index ? null : index
    );
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-violet-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-600 dark:text-violet-400">
            <Sparkles size={16} />
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Got Questions?
            <span className="block bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              We've Got Answers.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
            Find answers to common questions about ExpenseFlow and
            personal finance management.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-violet-300 bg-white shadow-lg shadow-violet-500/5 dark:border-violet-500/40 dark:bg-slate-900"
                    : "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-slate-900/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isOpen
                        ? "bg-violet-600 text-white"
                        : "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    }`}
                  >
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="px-6 pb-6"
                  >
                    <div className="h-px bg-slate-100 dark:bg-white/10" />

                    <p className="pt-5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Support */}
        <div className="mt-12 rounded-2xl border border-violet-200/60 bg-gradient-to-r from-violet-50 to-blue-50 p-7 text-center dark:border-violet-500/20 dark:from-violet-500/10 dark:to-blue-500/10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
            <MessageCircle size={23} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            Still have questions?
          </h3>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            We're happy to help you understand ExpenseFlow.
          </p>

          <a
            href="mailto:hello@example.com"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
};

export default FAQ;

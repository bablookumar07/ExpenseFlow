
import { Wallet,  Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "Overview", href: "#overview" },
    { name: "Features", href: "#features" },
    { name: "Analytics", href: "#analytics" },
    { name: "FAQ", href: "#faq" },
  ];

  const features = [
    "Expense Tracking",
    "Income Management",
    "Smart Analytics",
    "Category Reports",
  ];

  return (
    <footer className="border-t border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#home" className="mb-5 inline-flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white">
                <Wallet size={22} />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Expense<span className="text-violet-500">Flow</span>
              </span>
            </a>

            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Take control of your money with smarter expense tracking,
              meaningful insights and simple financial management.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {/* <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-violet-400"
              >
                <Github size={18} />
              </a> */}

              {/* <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-violet-400"
              >
                <Linkedin size={18} />
              </a> */}

              <a
                href="mailto:hello@example.com"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:text-slate-300 dark:hover:text-violet-400"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-slate-900 dark:text-white">
              Features
            </h3>

            <ul className="space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="text-sm text-slate-600 dark:text-slate-400"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <p className="text-sm text-slate-500 dark:text-slate-500">
            © {currentYear} ExpenseFlow. All rights reserved.
          </p>

          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Back to Home
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

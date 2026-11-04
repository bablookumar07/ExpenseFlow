
import { useEffect, useState } from "react";
import {
  Wallet,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "Overview", id: "overview" },
  { name: "Features", id: "features" },
  { name: "How It Works", id: "how-it-works" },
  { name: "Analytics", id: "analytics" },
  { name: "Benefits", id: "benefits" },
  { name: "FAQ", id: "faq" },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean);

      let current = "home";

      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 150) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/60 bg-white/85 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80"
          : "border-b border-slate-200/30 bg-white/60 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/40"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/25">
            <Wallet size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Expense<span className="text-violet-500">Flow</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-2 text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400"
              }`}
            >
              {link.name}

              {activeSection === link.id && (
                <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-violet-500" />
              )}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">

          <ThemeToggle
            theme={theme}
            toggleTheme={toggleTheme}
          />

          {/* Login */}
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-500 hover:text-violet-600 dark:border-white/10 dark:text-white dark:hover:border-violet-400 dark:hover:text-violet-400"
          >
            Login
          </Link>

          {/* Register */}
          <Link
            to="/register"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:-translate-y-0.5 hover:shadow-violet-500/40"
          >
            Get Started

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 lg:hidden">

          <ThemeToggle
            theme={theme}
            toggleTheme={toggleTheme}
          />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-white/10 dark:text-white"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-200/60 bg-white/95 px-5 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/95 lg:hidden">

          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Login */}
            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-3 flex items-center justify-center rounded-xl border border-violet-300 px-5 py-3 font-semibold text-violet-700 transition hover:bg-violet-50 dark:border-violet-400/30 dark:text-violet-300 dark:hover:bg-violet-500/10"
            >
              Login
            </Link>

            {/* Mobile Register */}
            <Link
              to="/register"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 font-semibold text-white"
            >
              Get Started
              <ArrowRight size={17} />
            </Link>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

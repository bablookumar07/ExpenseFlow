import ScrollProgress from "../../components/ScrollProgress";
import Navbar from "../../components/Navbar";
import BackToTop from "../../components/BackToTop";
import Footer from "../../components/Footer";

import Home from "../../sections/Home";
import Overview from "../../sections/Overview";
import Features from "../../sections/Features";
import HowItWorks from "../../sections/HowItWorks";
import LandingAnalytics from "../../sections/LandingAnalytics";
import Benefits from "../../sections/Benefits";
import FAQ from "../../sections/FAQ";
import CTA from "../../sections/CTA";

const LandingPage = ({ theme, toggleTheme }) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <ScrollProgress />

      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Home />
        <Overview />
        <Features />
        <HowItWorks />
        <LandingAnalytics />
        <Benefits />
        <FAQ />
        <CTA />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default LandingPage;
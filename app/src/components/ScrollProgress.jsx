

import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
  className="fixed left-0 top-20 z-[60] h-1 w-full bg-transparent"
  role="progressbar"
  aria-label="Page scroll progress"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={Math.round(progress)}
>
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500 shadow-[0_0_10px_rgba(139,92,246,0.6)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;

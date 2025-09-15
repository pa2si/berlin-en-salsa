"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth >= 640) {
        // Always visible on larger screens regardless of scroll
        setIsVisible(true);
        return;
      }

      // Threshold for more reliable scrolling behavior
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      if (currentScrollY < 10) {
        // Always show at the top of the page
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && scrollDelta > 5) {
        // Scrolling down - only hide if scrolled more than threshold
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current && scrollDelta > 5) {
        // Scrolling up - only show if scrolled more than threshold
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Initial check
    handleScroll();

    // Use throttled event listener for better performance
    let timeoutId: number | null = null;

    const throttledScrollHandler = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };

    // Add event listeners
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      window.removeEventListener("resize", handleScroll);
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const switchLanguage = (lang: string) => {
    if (lang === locale) return;

    // Use next-intl's router to navigate to the same page in different locale
    // This will maintain the current path and just switch the locale
    router.replace(pathname, { locale: lang as "de" | "es" });
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex transform transition-all duration-300 ease-in-out ${
        !isVisible
          ? "pointer-events-none -translate-y-20 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="backdrop-blur-m flex overflow-hidden rounded-full bg-gray-900/40 p-1 shadow-lg">
        <button
          className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
            locale === "de"
              ? "bg-bes-amber text-bes-red shadow-inner"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => switchLanguage("de")}
        >
          DE
        </button>
        <button
          className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-200 ${
            locale === "es"
              ? "bg-bes-amber text-bes-red shadow-inner"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => switchLanguage("es")}
        >
          ES
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

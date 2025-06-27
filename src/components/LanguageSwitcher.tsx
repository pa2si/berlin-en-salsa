"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("es");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Determine current language based on URL
    if (pathname.startsWith("/de")) {
      setCurrentLang("de");
    } else {
      setCurrentLang("es");
    }
  }, [pathname]);

  useEffect(() => {
    // Only apply this effect on screens smaller than sm (640px)
    const checkScreenWidth = () => {
      if (window.innerWidth >= 640) {
        setIsVisible(true); // Always visible on larger screens
        return;
      }

      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY < 10) {
          // Always show at the top of the page
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }

        lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };

    // Check screen width and add scroll listener if needed
    const checkAndSetupListener = () => {
      const cleanup = checkScreenWidth();

      // Also listen for resize events to update behavior
      window.addEventListener("resize", checkScreenWidth);

      return () => {
        if (cleanup) cleanup();
        window.removeEventListener("resize", checkScreenWidth);
      };
    };

    return checkAndSetupListener();
  }, []);

  const switchLanguage = (lang: string) => {
    if (lang === currentLang) return;

    if (lang === "de") {
      // Handle switching from Spanish to German
      if (pathname === "/") {
        router.push("/de");
      } else if (pathname === "/privacy") {
        router.push("/de/privacy");
      } else if (pathname === "/impressum") {
        router.push("/de/legal");
      } else {
        router.push("/de");
      }
    } else {
      // Handle switching from German to Spanish
      if (pathname === "/de") {
        router.push("/");
      } else if (pathname === "/de/privacy") {
        router.push("/privacy");
      } else if (pathname === "/de/legal") {
        router.push("/impressum");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex transform transition-transform duration-300 ${!isVisible ? "-translate-y-20" : "translate-y-0"}`}
    >
      <div className="flex overflow-hidden rounded-full bg-gray-900/40 p-1 backdrop-blur-sm">
        <button
          className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
            currentLang === "es"
              ? "bg-bes-amber text-bes-red"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => switchLanguage("es")}
        >
          ES
        </button>
        <button
          className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
            currentLang === "de"
              ? "bg-bes-amber text-bes-red"
              : "text-gray-300 hover:text-white"
          }`}
          onClick={() => switchLanguage("de")}
        >
          DE
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

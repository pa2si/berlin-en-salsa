"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState("es");

  useEffect(() => {
    // Determine current language based on URL
    if (pathname.startsWith("/de")) {
      setCurrentLang("de");
    } else {
      setCurrentLang("es");
    }
  }, [pathname]);

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
    <div className="fixed top-4 right-4 z-50 flex">
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

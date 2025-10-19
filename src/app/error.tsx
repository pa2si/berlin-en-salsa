"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-[var(--color-bes-amber)]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="relative mb-8 h-32 w-32 md:h-48 md:w-48"
      >
        <Image
          src="/bes-logo-color.webp"
          alt="Berlin En Salsa Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-bes-black)]">
          {t("title")}
        </h1>
        <p className="mb-6 text-lg text-[var(--color-bes-black)]">
          {t("message")}
        </p>
      </motion.div>

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="hover:bg-opacity-90 rounded-md bg-[var(--color-bes-purple)] px-6 py-2 text-white transition-colors"
        >
          {t("retry")}
        </motion.button>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="hover:bg-opacity-90 flex rounded-md bg-[var(--color-bes-red)] px-6 py-2 text-white transition-colors"
          >
            {t("backToHome")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

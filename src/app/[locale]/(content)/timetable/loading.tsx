"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("Loading");

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center bg-[var(--background)]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mb-8 h-32 w-32 md:h-40 md:w-40"
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
        initial={{ width: "0%" }}
        animate={{ width: "60%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="mb-4 h-1 rounded-full bg-[var(--color-bes-red)]"
      />

      <p className={`text-lg font-medium text-[var(--foreground)] opacity-75`}>
        {t("text")}
      </p>
    </div>
  );
}

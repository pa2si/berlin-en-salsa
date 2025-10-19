"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface TimetableComingSoonProps {
  title: string;
  message: string;
  buttonText: string;
}

/**
 * Full-screen modal component displayed when timetable is not yet available
 * Provides a user-friendly message and a way to navigate back to the home page
 */
export default function TimetableComingSoon({
  title,
  message,
  buttonText,
}: TimetableComingSoonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-bes-purple fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex max-w-md flex-col items-center text-center"
      >
        {/* Logo */}
        <Image
          src="/bes-logo-color.webp"
          alt="Berlin En Salsa"
          width={150}
          height={150}
          className="mb-8"
          priority
        />

        {/* Title */}
        <h1 className="text-bes-amber mb-4 text-3xl font-bold md:text-4xl">
          {title}
        </h1>

        {/* Message */}
        <p className="text-bes-amber mb-8 text-lg md:text-xl">{message}</p>

        {/* Button */}
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-bes-amber text-bes-purple rounded-full px-8 py-3 font-bold shadow-lg transition-all hover:shadow-xl"
          >
            {buttonText}
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

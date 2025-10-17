"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const SectionFive = () => {
  const [hoveredSaturday, setHoveredSaturday] = useState(false);
  const [hoveredSunday, setHoveredSunday] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("saturday"); // PHASE 5: Changed from "saturday" | "sunday" to string
  const t = useTranslations("Sections.SectionFive");

  return (
    <section
      className="bg-bes-amber bg- min-h-svh bg-fixed px-4 py-20"
      style={{ backgroundImage: "url('/bes-section-6-bg.webp')" }}
    >
      <div className="container mx-auto">
        {/* Title Image */}
        <div className="mb-12 flex justify-center">
          <h2 className="sr-only">{t("title")}</h2>
          <motion.img
            src="/timetable-amber.svg"
            alt={t("title")}
            className="w-full max-w-md"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          />
        </div>

        {/* Description */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-bes-amber mx-auto mb-6 max-w-3xl text-xl font-semibold md:text-2xl">
            {t("description")}
          </p>
        </motion.div>

        {/* Mobile Tab navigation (visible only on mobile) */}
        <div className="mb-6 flex justify-center space-x-4 md:hidden">
          <motion.div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("saturday")}
              className={`bg-bes-amber text-bes-red relative rounded-lg px-4 py-2 font-semibold shadow-md ${
                activeTab === "saturday" ? "ring-2 ring-white" : ""
              }`}
            >
              {t("saturday")}
              {activeTab === "saturday" && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute inset-0 rounded-lg ring-2 ring-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
            {activeTab === "saturday" && (
              <motion.div
                layoutId="activeIndicatorMobile"
                className="absolute right-0 -bottom-1 left-0 mx-auto h-1 w-4 rounded-full bg-white"
              />
            )}
          </motion.div>
          <motion.div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("sunday")}
              className={`bg-bes-amber text-bes-red relative rounded-lg px-4 py-2 font-semibold shadow-md ${
                activeTab === "sunday" ? "ring-2 ring-white" : ""
              }`}
            >
              {t("sunday")}
              {activeTab === "sunday" && (
                <motion.div
                  layoutId="activeTabMobile"
                  className="absolute inset-0 rounded-lg ring-2 ring-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
            {activeTab === "sunday" && (
              <motion.div
                layoutId="activeIndicatorMobile"
                className="absolute right-0 -bottom-1 left-0 mx-auto h-1 w-4 rounded-full bg-white"
              />
            )}
          </motion.div>
        </div>

        {/* Mobile Image Preview (visible only on mobile) */}
        <div className="mb-8 md:hidden">
          <AnimatePresence mode="wait">
            {activeTab === "saturday" ? (
              <motion.div
                key="saturday"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={{ pathname: "/timetable", query: { day: "saturday" } }}
                >
                  <motion.div
                    className="relative cursor-pointer overflow-hidden rounded-lg shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.img
                      src="/timetable-saturday.png"
                      alt={t("saturdayAlt")}
                      className="w-full rounded-lg"
                    />
                    <motion.div
                      className="bg-bes-red bg-opacity-70 absolute inset-0 flex flex-col items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-bes-amber mb-3 h-16 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </motion.div>
                      <motion.p
                        className="text-bes-amber text-lg font-bold"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {t("viewFullProgram")}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="sunday"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={{ pathname: "/timetable", query: { day: "sunday" } }}
                >
                  <motion.div
                    className="relative cursor-pointer overflow-hidden rounded-lg shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.img
                      src="/timetable-sunday.png"
                      alt={t("sundayAlt")}
                      className="w-full rounded-lg"
                    />
                    <motion.div
                      className="bg-bes-red bg-opacity-70 absolute inset-0 flex flex-col items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-bes-amber mb-3 h-16 w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </motion.div>
                      <motion.p
                        className="text-bes-amber text-lg font-bold"
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {t("viewFullProgram")}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Image Cards (hidden on mobile) */}
        <div className="mx-auto hidden max-w-5xl gap-8 md:grid md:grid-cols-2">
          {/* Saturday Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-bes-amber mb-4 text-2xl font-bold">
              {t("saturday")}
            </h3>
            <Link href={{ pathname: "/timetable", query: { day: "saturday" } }}>
              <motion.div
                className="relative cursor-pointer overflow-hidden rounded-lg shadow-xl"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredSaturday(true)}
                onMouseLeave={() => setHoveredSaturday(false)}
              >
                <motion.img
                  src="/timetable-saturday.png"
                  alt={t("saturdayAlt")}
                  className="w-full rounded-lg"
                  animate={{
                    scale: hoveredSaturday ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="bg-bes-red bg-opacity-70 absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSaturday ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: hoveredSaturday ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-bes-amber mb-3 h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </motion.div>
                  <motion.p
                    className="text-bes-amber text-lg font-bold"
                    initial={{ y: 10 }}
                    animate={{ y: hoveredSaturday ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t("viewFullProgram")}
                  </motion.p>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Sunday Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-bes-amber mb-4 text-2xl font-bold">
              {t("sunday")}
            </h3>
            <Link href={{ pathname: "/timetable", query: { day: "sunday" } }}>
              <motion.div
                className="relative cursor-pointer overflow-hidden rounded-lg shadow-xl"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setHoveredSunday(true)}
                onMouseLeave={() => setHoveredSunday(false)}
              >
                <motion.img
                  src="/timetable-sunday.png"
                  alt={t("sundayAlt")}
                  className="w-full rounded-lg"
                  animate={{
                    scale: hoveredSunday ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="bg-bes-red bg-opacity-70 absolute inset-0 flex flex-col items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredSunday ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: hoveredSunday ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-bes-amber mb-3 h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </motion.div>
                  <motion.p
                    className="text-bes-amber text-lg font-bold"
                    initial={{ y: 10 }}
                    animate={{ y: hoveredSunday ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {t("viewFullProgram")}
                  </motion.p>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionFive;

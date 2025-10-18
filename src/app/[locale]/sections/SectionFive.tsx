"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { buildTimetableQuery } from "@/components/timetable/utils/urlHelpers";
import { FESTIVAL_CONFIG } from "@/config/festival";

const SectionFive = () => {
  // Get festival days dynamically
  const festivalDays = FESTIVAL_CONFIG.days;

  // Dynamic hover states for each day
  const [hoveredDays, setHoveredDays] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>(
    festivalDays[0]?.weekday || "saturday",
  );
  const t = useTranslations("Sections.SectionFive");
  const locale = useLocale();

  // Helper to set hover state for a specific day
  const setHovered = (dayId: string, isHovered: boolean) => {
    setHoveredDays((prev) => ({ ...prev, [dayId]: isHovered }));
  };

  // Helper to get translated day name
  const getDayTranslation = (weekday: string) => {
    // Use the days object from translations
    return t(`days.${weekday}` as "days.saturday");
  };

  // Determine grid columns based on number of days
  const getGridClass = () => {
    const dayCount = festivalDays.length;
    if (dayCount === 1) return "md:grid-cols-1 max-w-2xl";
    // For 2 days: use original logic (grid from md onwards)
    if (dayCount === 2) return "md:grid-cols-2 max-w-5xl";
    // For 3+ days: use new logic (grid only from xl onwards)
    if (dayCount === 3) return "xl:grid-cols-3 max-w-6xl";
    // For 4+ days: 3 cols minimum, can expand to 4
    return "xl:grid-cols-3 2xl:grid-cols-4 max-w-7xl";
  };

  // Determine when to show mobile/tablet view vs grid
  const showMobileViewUntil =
    festivalDays.length <= 2 ? "md:hidden" : "xl:hidden";
  const showGridFrom = festivalDays.length <= 2 ? "md:grid" : "xl:grid";

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

        {/* Mobile/Tablet Tab navigation - Dynamic based on day count */}
        <div
          className={`mb-6 flex justify-center space-x-4 overflow-x-auto ${showMobileViewUntil}`}
        >
          {festivalDays.map((day) => (
            <motion.div key={day.id} className="relative flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(day.weekday)}
                className={`bg-bes-amber text-bes-red relative rounded-lg px-4 py-2 font-semibold shadow-md ${
                  activeTab === day.weekday ? "ring-2 ring-white" : ""
                }`}
              >
                {getDayTranslation(day.weekday)}
                {activeTab === day.weekday && (
                  <motion.div
                    layoutId="activeTabMobile"
                    className="absolute inset-0 rounded-lg ring-2 ring-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
              {activeTab === day.weekday && (
                <motion.div
                  layoutId="activeIndicatorMobile"
                  className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-4 rounded-full bg-white"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Single Image Preview with tabs - Dynamic based on day count */}
        <div className={`mb-8 ${showMobileViewUntil}`}>
          <AnimatePresence mode="wait">
            {festivalDays.map((day) =>
              activeTab === day.weekday ? (
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={
                    festivalDays.length > 2 ? "mx-auto sm:max-w-[70%]" : ""
                  }
                >
                  <Link
                    href={{
                      pathname: "/timetable",
                      query: buildTimetableQuery(day.weekday, locale),
                    }}
                  >
                    <motion.div
                      className="relative cursor-pointer overflow-hidden rounded-lg shadow-xl"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.img
                        src={`/timetable-links/${day.id}.png`}
                        alt={getDayTranslation(day.weekday)}
                        className="w-full rounded-lg"
                      />
                      <motion.div
                        className="bg-bes-red absolute inset-0 flex flex-col items-center justify-center bg-opacity-70"
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
              ) : null,
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Image Cards - Dynamic based on day count */}
        <div
          className={`mx-auto hidden gap-8 ${showGridFrom} ${getGridClass()}`}
        >
          {festivalDays.map((day, index) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-bes-amber mb-4 text-2xl font-bold">
                {getDayTranslation(day.weekday)}
              </h3>
              <Link
                href={{
                  pathname: "/timetable",
                  query: buildTimetableQuery(day.weekday, locale),
                }}
              >
                <motion.div
                  className="relative cursor-pointer overflow-hidden rounded-lg shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setHovered(day.id, true)}
                  onMouseLeave={() => setHovered(day.id, false)}
                >
                  <motion.img
                    src={`/timetable-links/${day.id}.png`}
                    alt={getDayTranslation(day.weekday)}
                    className="w-full rounded-lg"
                    animate={{
                      scale: hoveredDays[day.id] ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="bg-bes-red absolute inset-0 flex flex-col items-center justify-center bg-opacity-70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredDays[day.id] ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: hoveredDays[day.id] ? 1 : 0.8 }}
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
                      animate={{ y: hoveredDays[day.id] ? 0 : 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {t("viewFullProgram")}
                    </motion.p>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionFive;

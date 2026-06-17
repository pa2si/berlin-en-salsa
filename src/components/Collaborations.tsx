"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const Collaborations = () => {
  const t = useTranslations("Collaborations");

  // By moving the array INSIDE the component, we can call t() directly!
  // No need for strict types, interfaces, or "as any".
  const collaborationsData = [
    {
      id: 1,
      name: "Roses of Care Awareness",
      caption: t("roses"),
      image: "/roses-of-care.webp",
      url: "https://www.instagram.com/roc_awareness/",
    },
    {
      id: 2,
      name: "Club de Baile Collective",
      caption: t("club"),
      image: "/club-de-baile.webp",
      url: "https://www.instagram.com/clubdebaile__/",
    },
    {
      id: 3,
      name: "La Heliconia revista",
      caption: t("heliconia"),
      image: "/heliconia.webp",
      url: "https://substack.com/@laheliconiarevista",
    },
    {
      id: 4,
      name: "Lateinamerika Nachrichten",
      caption: t("ln"),
      image: "/ln.webp",
      url: "https://example.com",
    },
  ];

  return (
    <section id="footer-collaborations" className="w-full">
      <h3 className="mb-4 text-left text-sm font-semibold tracking-wide sm:mb-2 sm:text-base">
        {t("title")}
      </h3>

      <div className="grid grid-cols-2 gap-x-2 gap-y-8 sm:flex sm:flex-wrap sm:items-start sm:justify-center sm:gap-8 lg:gap-10 xl:grid xl:grid-cols-4 xl:gap-4 2xl:gap-6">
        {collaborationsData.map((collab, index) => (
          <a
            key={collab.id}
            href={collab.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto flex w-full flex-col items-center text-center sm:mx-0 sm:w-auto sm:max-w-40 xl:mx-auto xl:max-w-[120px] 2xl:max-w-40"
          >
            <motion.img
              src={collab.image}
              alt={`${collab.name} logo`}
              className="h-20 w-20 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24 xl:h-16 xl:w-16 2xl:h-24 2xl:w-24"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            />
            <div className="mt-3 w-full">
              <h4 className="group-hover:text-bes-red/80 line-clamp-2 text-sm font-bold transition-colors">
                {collab.name}
              </h4>
              <p className="text-bes-purple mt-1 line-clamp-3 text-sm opacity-80">
                {/* Just render the pre-translated string! */}
                {collab.caption}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

"use client";

import { SubscribeSection } from "@/components/GermanSubscribeSection";
import Image from "next/image";
import { motion } from "framer-motion";

const SectionSix = () => {
  return (
    <div className="bg-bes-amber flex flex-col overflow-y-auto py-10 sm:py-12 md:py-16 lg:h-full">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 lg:h-full lg:py-10">
        {/* Title */}
        <motion.div
          className="mb-4 flex w-full items-center justify-center sm:mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="sr-only">Kontakt</h2>
          <img
            src="/kontakt.svg"
            alt="Kontakt"
            className="w-[clamp(14rem,25vh,25rem)] object-contain"
          />
        </motion.div>

        {/* Social Media Links - Now full width and centered */}
        <motion.div
          className="mb-6 flex w-full flex-wrap items-center justify-center gap-x-[0.2rem] gap-y-2 sm:mb-8 sm:gap-x-[clamp(0.3rem,1vh,0.4rem)] md:gap-x-[clamp(1rem,1.5vh,1.5rem)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <motion.a
            href="https://www.instagram.com/berlinensalsa/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1 h-5 w-5 sm:h-[clamp(1.5rem,4vh,2.2rem)] sm:w-[clamp(1.5rem,4vh,2.2rem)]"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="text-sm font-bold sm:text-[clamp(1rem,3vh,1.4rem)]">
              Instagram
            </span>
          </motion.a>

          <motion.a
            href="mailto:info@berlinensalsa.com"
            className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1 h-5 w-5 sm:h-[clamp(1.5rem,4vh,2.2rem)] sm:w-[clamp(1.5rem,4vh,2.2rem)]"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            <span className="text-sm font-bold sm:text-[clamp(1rem,3vh,1.4rem)]">
              E-mail
            </span>
          </motion.a>

          <motion.a
            href="https://open.spotify.com/user/31cin24rvdxaothpsseizytsorxq?si=c0624aeb6b6e4906"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1 h-5 w-5 sm:h-[clamp(1.5rem,4vh,2.2rem)] sm:w-[clamp(1.5rem,4vh,2.2rem)]"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.75 14.65c-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85-.2.3-.55.4-.85.2zm1-2.7c-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1s-.7.5-1.05.25zM6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25C14.7 9 9.35 8.8 6.3 9.75z" />
            </svg>
            <span className="text-sm font-bold sm:text-[clamp(1rem,3vh,1.4rem)]">
              Spotify
            </span>
          </motion.a>

          <motion.a
            href="https://linktr.ee/BerlinEnSalsa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-1 h-5 w-5 sm:h-[clamp(1.5rem,4vh,2.2rem)] sm:w-[clamp(1.5rem,4vh,2.2rem)]"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-bold sm:text-[clamp(1rem,3vh,1.4rem)]">
              Linktree
            </span>
          </motion.a>
        </motion.div>

        {/* Two-Column Content */}
        <motion.div
          className="flex flex-col lg:w-full lg:flex-row lg:items-center lg:gap-6 xl:gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          {/* Left Column - Form */}
          <motion.div
            className="flex w-full flex-col items-center justify-center lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <SubscribeSection />
          </motion.div>

          {/* Right Column - Map */}
          <motion.div
            className="mt-8 flex w-full flex-col items-center lg:mt-0 lg:w-1/2 lg:justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          >
            <div className="w-full max-w-xl lg:max-w-none">
              <motion.a
                href="https://maps.app.goo.gl/KGTZ4cBkoJC1NAKq8"
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-lg shadow-lg transition-transform"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Image
                  src="/googlemaps.webp"
                  alt="Karte zum Standort von Berlin En Salsa"
                  width={600}
                  height={350}
                  className="h-auto max-h-[350px] w-full object-cover"
                />
              </motion.a>
              <p className="mt-2 text-center text-xs text-gray-600">
                Kartendaten © 2025, GeoBasis-DE/BKG (© 2009), Google
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionSix;

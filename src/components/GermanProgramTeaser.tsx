"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GermanProgramCountdown from "./GermanProgramCountdown";
import GermanProgramButton from "./GermanProgramButton";

const GermanProgramTeaser = () => {
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentTeaser, setCurrentTeaser] = useState(0);

  // Program teasers - replace with actual program highlights
  const teasers = [
    {
      title: "Live-Orchester",
      description: "Die besten Salsa-Orchester Berlins spielen live.",
      icon: "🎵",
    },
    {
      title: "Tanzworkshops",
      description:
        "Entdecke verschiedene Tanzstile und lass dich vom Rhythmus leiten.",
      icon: "💃",
    },
    {
      title: "Musikworkshops",
      description:
        "Erforsche die Seele der Salsa mit Perkussion-, Rhythmus- und weiteren Kursen.",
      icon: "🎹",
    },
    {
      title: "Legendäre DJs",
      description: "Musikauswahl, die dich die ganze Nacht tanzen lässt.",
      icon: "🎧",
    },
    {
      title: "Kultur und Kunst",
      description:
        "Schallplatten Markt, Vorträge und mehr kulturelle Aktivitäten.",
      icon: "disco", // Using "disco" to indicate we'll use the image instead of emoji
    },
  ];

  // Show button immediately, but don't show modal automatically
  useEffect(() => {
    // Set button to show immediately
    setShowButton(true);

    // No longer automatically showing the modal
    // The modal will only appear when the button is clicked
  }, []);

  // Rotate through teasers
  useEffect(() => {
    if (!showModal) return;

    const interval = setInterval(() => {
      setCurrentTeaser((prev) => (prev + 1) % teasers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showModal, teasers.length]);

  return (
    <>
      {showButton && <GermanProgramButton />}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-bes-red bg-opacity-95 relative max-h-[90vh] max-w-3xl overflow-y-auto rounded-lg p-4 shadow-2xl sm:p-8"
            >
              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="text-bes-amber hover:bg-opacity-10 absolute top-4 right-4 rounded-full p-2 hover:bg-white"
                aria-label="Schließen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Top disco animation */}
              <div className="mb-6 flex justify-center">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <img
                    src="/bes-logo-habano.png"
                    alt="Berlin En Salsa"
                    className="h-25 w-auto"
                  />
                </motion.div>
              </div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-bes-amber mb-4 text-center text-3xl font-bold sm:text-4xl"
              >
                Vollständiges Programm in Kürze!
              </motion.h2>

              {/* Teaser section */}
              <div className="mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTeaser}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-4"
                  >
                    {teasers[currentTeaser].icon === "disco" ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="flex-shrink-0"
                      >
                        <img
                          src="/disco.svg"
                          alt="Disco"
                          className="h-10 w-10"
                        />
                      </motion.div>
                    ) : (
                      <span className="text-4xl">
                        {teasers[currentTeaser].icon}
                      </span>
                    )}
                    <div>
                      <h3 className="text-bes-amber text-xl font-bold">
                        {teasers[currentTeaser].title}
                      </h3>
                      <p className="text-white">
                        {teasers[currentTeaser].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Teaser navigation dots */}
                <div className="mt-4 flex justify-center space-x-2">
                  {teasers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTeaser(index)}
                      className={`h-2 w-2 rounded-full ${index === currentTeaser ? "bg-bes-amber" : "bg-opacity-40 bg-white"}`}
                      aria-label={`Teaser ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Countdown component */}
              <GermanProgramCountdown />

              {/* Call to action */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-center"
              >
                <p className="text-bes-amber mb-2 italic">
                  *Alle Aktivitäten sind kostenlos und für die ganze Familie
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GermanProgramTeaser;

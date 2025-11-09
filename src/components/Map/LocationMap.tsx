"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LocationMapProps {
  href?: string;
  alt?: string;
}

const LocationMap = ({
  href = "https://maps.app.goo.gl/KGTZ4cBkoJC1NAKq8",
  alt = "Mapa de la ubicación",
}: LocationMapProps) => {
  return (
    <div className="w-full max-w-xl lg:max-w-none">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-lg shadow-lg transition-transform"
        whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Image
          src="/googlemaps.webp"
          alt={alt}
          width={600}
          height={350}
          className="h-auto max-h-[350px] w-full object-cover"
        />
      </motion.a>
      <p className="mt-2 text-center text-xs text-gray-600">
        Kartendaten © 2025, GeoBasis-DE/BKG (© 2009), Google
      </p>
    </div>
  );
};

export default LocationMap;

"use client";

import { useMemo } from "react";
import { FESTIVAL_CONFIG } from "@/config/festival";
import {
  GermanCountdownBanner,
  GermanLiveBanner,
  GermanPostFestivalBanner,
} from "@/components/german-banners";

const GermanFestivalBanner = () => {
  // Determine which banner to show based on current date
  const currentBanner = useMemo(() => {
    const now = new Date();

    if (now < FESTIVAL_CONFIG.dates.start) {
      return <GermanCountdownBanner targetDate={FESTIVAL_CONFIG.dates.start} />;
    } else if (
      now >= FESTIVAL_CONFIG.dates.start &&
      now <= FESTIVAL_CONFIG.dates.end
    ) {
      return <GermanLiveBanner />;
    } else {
      return <GermanPostFestivalBanner />;
    }
  }, []);

  return currentBanner;
};

export default GermanFestivalBanner;

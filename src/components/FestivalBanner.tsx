"use client";

import { useMemo } from "react";
import { FESTIVAL_CONFIG } from "@/config/festival";
import {
  CountdownBanner,
  // LiveBanner, // TODO: Fix LiveBanner in separate branch
  PostFestivalBanner,
} from "@/components/banners";

const FestivalBanner = () => {
  // Determine which banner to show based on current date
  const currentBanner = useMemo(() => {
    const now = new Date();

    if (now < FESTIVAL_CONFIG.dates.start) {
      return <CountdownBanner targetDate={FESTIVAL_CONFIG.dates.start} />;
    } else if (
      now >= FESTIVAL_CONFIG.dates.start &&
      now <= FESTIVAL_CONFIG.dates.end
    ) {
      // return <LiveBanner />; // TODO: Re-enable once LiveBanner is fixed
      return <PostFestivalBanner />; // Temporary fallback
    } else {
      return <PostFestivalBanner />;
    }
  }, []);

  return currentBanner;
};

export default FestivalBanner;

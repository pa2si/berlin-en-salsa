"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FESTIVAL_CONFIG } from "@/config/festival";

// 1. Code-split the banners using next/dynamic
// This prevents mobile devices from downloading JavaScript for banners they don't need yet.
const CountdownBanner = dynamic(
  () => import("@/components/banners/CountdownBanner"),
  {
    ssr: false,
  },
);
const LiveBanner = dynamic(() => import("@/components/banners/LiveBanner"), {
  ssr: false,
});
const PostFestivalBanner = dynamic(
  () => import("@/components/banners/PostFestivalBanner"),
  {
    ssr: false,
  },
);

const FestivalBanner = () => {
  // 2. State to track client-side mounting
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null during server-side pre-rendering to prevent timezone/date mismatches
  if (!mounted) return null;

  const now = new Date();

  if (now < FESTIVAL_CONFIG.dates.start) {
    return <CountdownBanner targetDate={FESTIVAL_CONFIG.dates.start} />;
  } else if (
    now >= FESTIVAL_CONFIG.dates.start &&
    now <= FESTIVAL_CONFIG.dates.end
  ) {
    return <LiveBanner />;
  } else {
    return <PostFestivalBanner />;
  }
};

export default FestivalBanner;

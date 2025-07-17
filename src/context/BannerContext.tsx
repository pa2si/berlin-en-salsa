"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
type BannerContextType = {
  isBannerVisible: boolean;
  setIsBannerVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create context with default values
const BannerContext = createContext<BannerContextType>({
  isBannerVisible: false,
  setIsBannerVisible: () => {},
});

// Custom hook to use the banner context
export const useBannerContext = () => useContext(BannerContext);

// Provider component
export const BannerProvider = ({ children }: { children: ReactNode }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  return (
    <BannerContext.Provider value={{ isBannerVisible, setIsBannerVisible }}>
      {children}
    </BannerContext.Provider>
  );
};

import { useState, useEffect, useCallback } from "react";

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface UseGallerySliderProps {
  images: GalleryImage[];
  autoPlayInterval?: number;
  autoPlay?: boolean;
}

export interface UseGallerySliderReturn {
  currentIndex: number;
  isAnimating: boolean;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  isPaused: boolean;
  togglePause: () => void;
}

/**
 * Custom hook for managing gallery slider logic
 */
export const useGallerySlider = ({
  images,
  autoPlayInterval = 5000,
  autoPlay = true,
}: UseGallerySliderProps): UseGallerySliderReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [currentIndex, isAnimating],
  );

  const nextSlide = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  }, [currentIndex, images.length, goToSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  }, [currentIndex, images.length, goToSlide]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, nextSlide, images.length]);

  return {
    currentIndex,
    isAnimating,
    nextSlide,
    prevSlide,
    goToSlide,
    isPaused,
    togglePause,
  };
};

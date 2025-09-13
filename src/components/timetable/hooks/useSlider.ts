import { useState } from "react";

/**
 * Hook for managing slider functionality in event modals
 */
export const useSlider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const nextSlide = (maxSlides: number) => {
    setCurrentSlideIndex((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = (maxSlides: number) => {
    setCurrentSlideIndex((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const resetSlider = () => {
    setCurrentSlideIndex(0);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (maxSlides: number) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide(maxSlides);
    }
    if (isRightSwipe) {
      prevSlide(maxSlides);
    }
  };

  return {
    currentSlideIndex,
    goToSlide,
    nextSlide,
    prevSlide,
    resetSlider,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

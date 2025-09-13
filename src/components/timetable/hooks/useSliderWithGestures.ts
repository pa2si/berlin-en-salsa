import { useState, useCallback, useEffect } from "react";
import { TouchGestureService } from "../../../services/timetable/TouchGestureService";

/**
 * Enhanced slider hook with touch gesture support using TouchGestureService
 */
export const useSliderWithGestures = (totalSlides: number = 0) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Reset slide index when total slides change
  useEffect(() => {
    if (currentSlideIndex >= totalSlides) {
      setCurrentSlideIndex(0);
    }
  }, [totalSlides, currentSlideIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setDirection(index > currentSlideIndex ? 1 : -1);
        setCurrentSlideIndex(index);
      }
    },
    [currentSlideIndex, totalSlides],
  );

  const nextSlide = useCallback(() => {
    if (totalSlides > 0) {
      const nextIndex = (currentSlideIndex + 1) % totalSlides;
      setDirection(1);
      setCurrentSlideIndex(nextIndex);
    }
  }, [currentSlideIndex, totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides > 0) {
      const prevIndex =
        currentSlideIndex === 0 ? totalSlides - 1 : currentSlideIndex - 1;
      setDirection(-1);
      setCurrentSlideIndex(prevIndex);
    }
  }, [currentSlideIndex, totalSlides]);

  const resetSlider = useCallback(() => {
    setCurrentSlideIndex(0);
    setDirection(0);
  }, []);

  // Touch gesture handlers
  const touchHandlers = TouchGestureService.createSwipeHandlers(
    nextSlide, // onSwipeLeft -> next slide
    prevSlide, // onSwipeRight -> previous slide
  );

  // Enhanced touch handlers with additional features
  const enhancedTouchHandlers = {
    ...touchHandlers,
    onTouchStart: (e: React.TouchEvent) => {
      // Prevent default to avoid scroll
      if (TouchGestureService.isSingleTouch(e)) {
        touchHandlers.onTouchStart(e);
      }
    },
    onTouchEnd: (e: React.TouchEvent) => {
      touchHandlers.onTouchEnd(e);
    },
    onTouchCancel: touchHandlers.onTouchCancel,
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevSlide();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextSlide();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
        case "Escape":
          e.preventDefault();
          resetSlider();
          break;
      }
    },
    [prevSlide, nextSlide, goToSlide, totalSlides, resetSlider],
  );

  // Auto-play functionality
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(3000);

  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide, totalSlides]);

  const toggleAutoPlay = useCallback(() => {
    setAutoPlay((prev) => !prev);
  }, []);

  const setAutoPlaySpeed = useCallback((interval: number) => {
    setAutoPlayInterval(Math.max(1000, interval)); // Minimum 1 second
  }, []);

  // Progress calculation
  const progress =
    totalSlides > 0 ? ((currentSlideIndex + 1) / totalSlides) * 100 : 0;

  return {
    // Core slider state
    currentSlideIndex,
    direction,
    totalSlides,
    progress,

    // Navigation methods
    goToSlide,
    nextSlide,
    prevSlide,
    resetSlider,

    // Touch gesture support
    touchHandlers: enhancedTouchHandlers,

    // Keyboard navigation
    handleKeyDown,

    // Auto-play features
    autoPlay,
    autoPlayInterval,
    toggleAutoPlay,
    setAutoPlaySpeed,

    // Utility methods
    isFirstSlide: currentSlideIndex === 0,
    isLastSlide: currentSlideIndex === totalSlides - 1,
    hasMultipleSlides: totalSlides > 1,
  };
};

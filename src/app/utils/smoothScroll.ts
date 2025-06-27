"use client";

export const initSmoothScroll = () => {
  if (typeof window === "undefined") return () => {};

  let isScrolling = false;
  let animationFrameId: number;

  // Smooth scroll function with easing
  const smoothScrollTo = (targetY: number, duration: number) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    // Easing function - ease in-out cubic
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Animation function
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (elapsedTime < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        isScrolling = false;
      }
    };

    // Cancel any ongoing animation
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    // Start animation
    isScrolling = true;
    animationFrameId = requestAnimationFrame(animate);
  };

  // Handle wheel events
  const handleWheel = (event: WheelEvent) => {
    if (isScrolling) {
      event.preventDefault();
      return;
    }

    const direction = event.deltaY > 0 ? 1 : -1;

    // Get all snap sections
    const sections = document.querySelectorAll("main.snap-scroll > div");
    if (!sections.length) return;

    // Find current section
    let currentSectionIndex = 0;
    const scrollPosition = window.scrollY;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      if (scrollPosition < section.offsetTop + section.offsetHeight / 2) {
        currentSectionIndex = i;
        break;
      }
    }

    // Calculate target section
    const targetIndex = Math.max(
      0,
      Math.min(sections.length - 1, currentSectionIndex + direction),
    );
    if (targetIndex === currentSectionIndex) return;

    const targetSection = sections[targetIndex] as HTMLElement;
    event.preventDefault();

    // Smooth scroll to target section
    smoothScrollTo(targetSection.offsetTop, 1500); // 1.5 seconds duration
  };

  // Add event listener
  window.addEventListener("wheel", handleWheel, { passive: false });

  // Return cleanup function
  return () => {
    window.removeEventListener("wheel", handleWheel);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
};

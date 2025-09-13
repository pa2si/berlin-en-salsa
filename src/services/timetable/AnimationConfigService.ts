import { Variants, Transition } from "framer-motion";

/**
 * Service for managing animation configurations
 * Centralizes all Framer Motion animations for consistency
 */
export class AnimationConfigService {
  /**
   * Day selector button animation
   */
  static readonly DAY_SELECTOR: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  /**
   * Day selector background transition
   */
  static readonly DAY_SELECTOR_TRANSITION: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  /**
   * Timetable grid container animation
   */
  static readonly GRID_CONTAINER: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  /**
   * Timetable column animation
   */
  static readonly GRID_COLUMN: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  /**
   * Time slot animation
   */
  static readonly TIME_SLOT: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  /**
   * Dance show bubble animation
   */
  static readonly DANCE_SHOW_BUBBLE: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  /**
   * Modal backdrop animation
   */
  static readonly MODAL_BACKDROP: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  /**
   * Modal content animation
   */
  static readonly MODAL_CONTENT: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  /**
   * Slider navigation animation
   */
  static readonly SLIDER_NAVIGATION: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
  };

  /**
   * Slide transition animation
   */
  static readonly SLIDE_TRANSITION: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  /**
   * Slide transition timing
   */
  static readonly SLIDE_TRANSITION_CONFIG: Transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
  };

  /**
   * BES Logo animation
   */
  static readonly BES_LOGO: Variants = {
    hidden: { opacity: 0, rotate: -180, scale: 0 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "backOut",
      },
    },
  };

  /**
   * Page transition animation
   */
  static readonly PAGE_TRANSITION: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  /**
   * Loading spinner animation
   */
  static readonly LOADING_SPINNER: Variants = {
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  /**
   * Get stagger children transition
   */
  static getStaggerTransition(
    staggerDelay: number = 0.1,
    delayChildren: number = 0,
  ): Transition {
    return {
      staggerChildren: staggerDelay,
      delayChildren,
    };
  }

  /**
   * Get spring transition with custom config
   */
  static getSpringTransition(
    stiffness: number = 300,
    damping: number = 30,
    duration?: number,
  ): Transition {
    const config: Transition = {
      type: "spring",
      stiffness,
      damping,
    };

    if (duration) {
      config.duration = duration;
    }

    return config;
  }
}

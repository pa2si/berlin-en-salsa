/**
 * Touch event data interface
 */
interface TouchEventData {
  startX: number;
  startY: number;
  startTime: number;
  endX?: number;
  endY?: number;
  endTime?: number;
}

/**
 * Swipe direction enum
 */
const SwipeDirection = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  UP: "UP",
  DOWN: "DOWN",
  NONE: "NONE",
} as const;

type SwipeDirectionType = (typeof SwipeDirection)[keyof typeof SwipeDirection];

/**
 * Swipe result interface
 */
interface SwipeResult {
  direction: SwipeDirectionType;
  distance: number;
  duration: number;
  velocity: number;
}

/**
 * Service for handling touch and gesture interactions
 * Provides touch/swipe detection for slider navigation
 */
export class TouchGestureService {
  private static readonly MIN_SWIPE_DISTANCE = 50;
  private static readonly MAX_SWIPE_TIME = 500;

  static readonly SwipeDirection = SwipeDirection;

  /**
   * Processes touch start event
   */
  static handleTouchStart(e: TouchEvent | React.TouchEvent): TouchEventData {
    const touch = e.touches[0];
    return {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };
  }

  /**
   * Processes touch end event and determines swipe
   */
  static handleTouchEnd(
    e: TouchEvent | React.TouchEvent,
    touchData: TouchEventData,
  ): SwipeResult {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();

    const deltaX = endX - touchData.startX;
    const deltaY = endY - touchData.startY;
    const duration = endTime - touchData.startTime;

    const absDeltas = {
      x: Math.abs(deltaX),
      y: Math.abs(deltaY),
    };

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = distance / duration;

    // Determine if it's a valid swipe
    if (distance < this.MIN_SWIPE_DISTANCE || duration > this.MAX_SWIPE_TIME) {
      return {
        direction: this.SwipeDirection.NONE,
        distance,
        duration,
        velocity,
      };
    }

    // Determine direction (prioritize the axis with greater movement)
    let direction: SwipeDirectionType;
    if (absDeltas.x > absDeltas.y) {
      // Horizontal swipe
      direction =
        deltaX > 0 ? this.SwipeDirection.RIGHT : this.SwipeDirection.LEFT;
    } else {
      // Vertical swipe
      direction =
        deltaY > 0 ? this.SwipeDirection.DOWN : this.SwipeDirection.UP;
    }

    return {
      direction,
      distance,
      duration,
      velocity,
    };
  }

  /**
   * Creates touch event handlers for swipe detection
   */
  static createSwipeHandlers(
    onSwipeLeft?: () => void,
    onSwipeRight?: () => void,
    onSwipeUp?: () => void,
    onSwipeDown?: () => void,
  ) {
    let touchData: TouchEventData | null = null;

    return {
      onTouchStart: (e: TouchEvent | React.TouchEvent) => {
        touchData = this.handleTouchStart(e);
      },
      onTouchEnd: (e: TouchEvent | React.TouchEvent) => {
        if (!touchData) return;

        const swipeResult = this.handleTouchEnd(e, touchData);

        switch (swipeResult.direction) {
          case this.SwipeDirection.LEFT:
            onSwipeLeft?.();
            break;
          case this.SwipeDirection.RIGHT:
            onSwipeRight?.();
            break;
          case this.SwipeDirection.UP:
            onSwipeUp?.();
            break;
          case this.SwipeDirection.DOWN:
            onSwipeDown?.();
            break;
        }

        touchData = null;
      },
      onTouchCancel: () => {
        touchData = null;
      },
    };
  }

  /**
   * Checks if a swipe is fast enough to be considered a flick
   */
  static isFlickGesture(swipeResult: SwipeResult): boolean {
    return swipeResult.velocity > 0.5; // pixels per millisecond
  }

  /**
   * Gets the opposite direction of a swipe
   */
  static getOppositeDirection(
    direction: SwipeDirectionType,
  ): SwipeDirectionType {
    switch (direction) {
      case this.SwipeDirection.LEFT:
        return this.SwipeDirection.RIGHT;
      case this.SwipeDirection.RIGHT:
        return this.SwipeDirection.LEFT;
      case this.SwipeDirection.UP:
        return this.SwipeDirection.DOWN;
      case this.SwipeDirection.DOWN:
        return this.SwipeDirection.UP;
      default:
        return this.SwipeDirection.NONE;
    }
  }

  /**
   * Prevents default touch behavior (like scroll) during gestures
   */
  static preventDefaultTouch(e: TouchEvent | React.TouchEvent): void {
    e.preventDefault();
  }

  /**
   * Checks if touch event is a single finger touch
   */
  static isSingleTouch(e: TouchEvent | React.TouchEvent): boolean {
    return e.touches.length === 1;
  }

  /**
   * Gets touch coordinates from event
   */
  static getTouchCoordinates(e: TouchEvent | React.TouchEvent): {
    x: number;
    y: number;
  } {
    const touch = e.touches[0] || e.changedTouches[0];
    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  }
}

# Drag/Swipe Navigation - Technical Details

## 🎯 Overview

The gallery slider now supports natural drag and swipe gestures using Framer Motion's built-in drag functionality. This works seamlessly on both mobile (touch) and desktop (mouse) devices.

## ✨ Features

### Touch & Mouse Support

- **Mobile**: Swipe left/right with finger
- **Desktop**: Click and drag with mouse
- **Smooth**: Physics-based spring animations
- **Intuitive**: Natural gesture recognition

### Smart Detection

- **Distance Threshold**: 50px minimum swipe distance
- **Velocity Threshold**: 500px/s for quick flicks
- **Direction**: Horizontal swipes only (vertical scroll preserved)
- **Elastic Boundaries**: Bounce-back effect at edges

## 🔧 Implementation

### Core Functionality

The drag feature is implemented using Framer Motion's `drag` prop on the main container:

```tsx
<motion.div
  drag="x"                                    // Only horizontal dragging
  dragConstraints={{ left: 0, right: 0 }}     // Snap back to center
  dragElastic={0.2}                           // Elasticity when pulled
  onDragEnd={handleDragEnd}                   // Callback on drag release
  dragTransition={{
    bounceStiffness: 600,
    bounceDamping: 20
  }}
>
```

### Gesture Detection Logic

```typescript
const handleDragEnd = (
  event: MouseEvent | TouchEvent | PointerEvent,
  info: PanInfo,
) => {
  const swipeThreshold = 50; // Min distance (pixels)
  const swipeVelocityThreshold = 500; // Min velocity (px/s)

  // Check if swipe was significant enough
  if (
    Math.abs(info.offset.x) > swipeThreshold ||
    Math.abs(info.velocity.x) > swipeVelocityThreshold
  ) {
    if (info.offset.x > 0) {
      // Swiped right → Previous slide
      prevSlide();
    } else {
      // Swiped left → Next slide
      nextSlide();
    }
  }
};
```

## 📊 Parameters Explained

### `info.offset.x`

- **Type**: Number (pixels)
- **Description**: Total horizontal distance dragged
- **Positive**: Dragged right
- **Negative**: Dragged left
- **Usage**: Determines direction and validates minimum distance

### `info.velocity.x`

- **Type**: Number (pixels per second)
- **Description**: Speed of the drag gesture
- **Purpose**: Allows quick flicks to trigger navigation even with short distance
- **Example**: Fast swipe at 600px/s triggers even if only moved 30px

### Thresholds

| Parameter                | Value     | Purpose                                                |
| ------------------------ | --------- | ------------------------------------------------------ |
| `swipeThreshold`         | 50px      | Minimum drag distance to register as intentional swipe |
| `swipeVelocityThreshold` | 500px/s   | Minimum speed for quick flick detection                |
| `dragElastic`            | 0.2 (20%) | How far beyond bounds user can drag                    |
| `bounceStiffness`        | 600       | Spring stiffness for snap-back animation               |
| `bounceDamping`          | 20        | Damping for smooth bounce-back                         |

## 🎨 Visual Feedback

### Cursor States

```css
.cursor-grab        /* Ready to drag (hover) */
.cursor-grabbing    /* Currently dragging */
```

### Drag Behavior

1. **Initial**: Container sits at center position
2. **Dragging**: Follows cursor/finger with elastic resistance
3. **Release**:
   - If threshold met → Animates to next/previous slide
   - If threshold not met → Bounces back to center

## 🔄 Interaction Flow

```
User starts drag
    ↓
Cursor changes to "grabbing"
    ↓
Container follows finger/mouse
    ↓
User releases
    ↓
Check distance & velocity
    ↓
    ├─ Threshold met → Navigate to new slide
    └─ Threshold not met → Bounce back to current
```

## 🎯 Customization Options

### Adjust Sensitivity

**More sensitive** (trigger easier):

```typescript
const swipeThreshold = 30; // Reduced from 50
const swipeVelocityThreshold = 300; // Reduced from 500
```

**Less sensitive** (require stronger swipe):

```typescript
const swipeThreshold = 100; // Increased from 50
const swipeVelocityThreshold = 800; // Increased from 500
```

### Adjust Elasticity

**More elastic** (easier to drag):

```tsx
<motion.div dragElastic={0.5}>  {/* Increased from 0.2 */}
```

**Less elastic** (harder to drag):

```tsx
<motion.div dragElastic={0.1}>  {/* Decreased from 0.2 */}
```

### Adjust Bounce Speed

**Faster bounce-back**:

```tsx
<motion.div
  dragTransition={{
    bounceStiffness: 800,  // Increased from 600
    bounceDamping: 15      // Decreased from 20
  }}
>
```

**Slower bounce-back**:

```tsx
<motion.div
  dragTransition={{
    bounceStiffness: 400,  // Decreased from 600
    bounceDamping: 30      // Increased from 20
  }}
>
```

## 📱 Mobile vs Desktop

### Differences

| Feature   | Mobile (Touch)   | Desktop (Mouse) |
| --------- | ---------------- | --------------- |
| Trigger   | Finger swipe     | Click & drag    |
| Visual    | No cursor change | Grab cursor     |
| Feel      | Natural gesture  | Click-hold-drag |
| Speed     | Usually faster   | Usually slower  |
| Precision | Less precise     | More precise    |

### Optimization

Both input methods use the **same thresholds** to ensure consistent behavior across devices. The velocity threshold helps accommodate different interaction patterns.

## 🔍 Edge Cases Handled

### ✅ Prevents Issues With:

1. **Accidental drags**: Threshold prevents tiny movements
2. **Slow drags**: Velocity check catches quick flicks
3. **Vertical scrolling**: `drag="x"` preserves vertical scroll
4. **Over-dragging**: `dragConstraints` prevents infinite drag
5. **Animation conflicts**: `isAnimating` state prevents mid-transition drags

### Example Scenarios

**Scenario 1: Slow, long swipe**

- Distance: 80px → ✅ Exceeds 50px threshold
- Result: Navigates to next slide

**Scenario 2: Quick flick**

- Distance: 40px → ❌ Below 50px threshold
- Velocity: 700px/s → ✅ Exceeds 500px/s threshold
- Result: Navigates to next slide

**Scenario 3: Tentative drag**

- Distance: 20px → ❌ Below 50px threshold
- Velocity: 200px/s → ❌ Below 500px/s threshold
- Result: Bounces back, stays on current slide

## 🎮 Combined Input Methods

Users can now navigate using:

1. ✅ **Drag/Swipe** - Natural gestures
2. ✅ **Arrow buttons** - Desktop convenience
3. ✅ **Dot indicators** - Direct navigation
4. ✅ **Side card clicks** - Quick next/prev
5. ✅ **Keyboard arrows** - Accessibility (if implemented)

All methods work seamlessly together!

## ⚡ Performance Notes

### Optimizations

- **Hardware accelerated**: Uses CSS transforms
- **No re-renders**: Drag handled by Framer Motion
- **Debounced**: Can't trigger navigation during animation
- **Efficient**: Only active container is draggable

### No Performance Impact

- Drag feature adds minimal overhead
- Uses native touch/pointer events
- No polling or continuous calculations
- Springs use optimized physics engine

## 🐛 Troubleshooting

### Drag feels sluggish

- Increase `dragElastic` to 0.3 or 0.4
- Reduce `bounceStiffness` to 400-500

### Too sensitive (navigates too easily)

- Increase `swipeThreshold` to 70-100
- Increase `swipeVelocityThreshold` to 700-1000

### Not sensitive enough

- Decrease `swipeThreshold` to 30-40
- Decrease `swipeVelocityThreshold` to 300-400

### Conflicts with vertical scroll

- Should not occur (`drag="x"` prevents this)
- If issues, check for CSS `touch-action` conflicts

### Cursor doesn't change

- Ensure `cursor-grab` and `cursor-grabbing` are in Tailwind
- Check browser supports these cursor values

## 📚 Related Documentation

- [Framer Motion Drag Docs](https://www.framer.com/motion/gestures/#drag)
- [Gallery Implementation Guide](./GALLERY_SLIDER_IMPLEMENTATION.md)
- [Visual Design Reference](./GALLERY_VISUAL_REFERENCE.md)

---

**Added**: October 2025  
**No Extra Package Required**: Uses built-in Framer Motion features  
**Works On**: Mobile (iOS/Android), Desktop (Chrome/Safari/Firefox/Edge)

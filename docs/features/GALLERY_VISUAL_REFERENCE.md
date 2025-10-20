# Gallery Slider - Visual Design Reference

## 🎨 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                         GALLERY                               │
│                        ━━━━━━━                                │
│                                                               │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                       │   │
│   │    [◄]   ╔═══════════════════════════╗      [►]    │   │
│   │          ║                           ║              │   │
│   │       ╔══╬═══  CURRENT IMAGE  ═══════╬══╗           │   │
│   │       ║  ║                           ║  ║           │   │
│   │    ╔══╬══╬═══════════════════════════╬══╬══╗        │   │
│   │    ║  ║  ║                           ║  ║  ║        │   │
│   │    ║PREV║       16:9 aspect          ║NEXT║        │   │
│   │    ║  ║  ║                           ║  ║  ║        │   │
│   │    ╚══╬══╬═══════════════════════════╬══╬══╝        │   │
│   │       ║  ║    (amber ring border)    ║  ║           │   │
│   │       ╚══╬═══════════════════════════╬══╝           │   │
│   │          ║                           ║              │   │
│   │          ╚═══════════════════════════╝              │   │
│   │                                                       │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                               │
│                    ● ● ⊙ ● ●  [⏸]                            │
│                                                               │
│                       3 / 5                                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Key Design Elements

### 1. Title Section

```
    GALLERY        <- bes-amber, bold, clamp(2rem, 6vw, 4rem)
    ━━━━━━━        <- bes-red divider, 1px height, rounded
```

### 2. Image Stack (3D Perspective)

```
Active Image (z: 20)
├─ Scale: 100%
├─ Opacity: 100%
├─ Ring: 4px bes-amber
├─ Rotation: 0deg
└─ Filter: brightness(1)

Previous Image (z: 0)
├─ Scale: 85%
├─ Opacity: 30%
├─ Ring: 2px bes-purple/50
├─ Rotation: 15deg (Y-axis)
├─ X offset: -25%
└─ Filter: brightness(0.6)

Next Image (z: 0)
├─ Scale: 85%
├─ Opacity: 30%
├─ Ring: 2px bes-purple/50
├─ Rotation: -15deg (Y-axis)
├─ X offset: +25%
└─ Filter: brightness(0.6)
```

### 3. Navigation Arrows (Desktop)

```
[◄]  Left Arrow
├─ Background: bes-amber/90 → bes-amber (hover)
├─ Position: Absolute left-4
├─ Size: 48px × 48px (lg: 64px × 64px)
├─ Icon: 32px × 32px (chevron-left)
├─ Hover: scale(1.1)
└─ Shadow: lg

[►]  Right Arrow
├─ Same as left but positioned right-4
└─ Icon: chevron-right
```

### 4. Navigation Dots

```
● ● ⊙ ● ●
│ │ │ │ └─ Inactive: bes-amber/30, 12px diameter
│ │ │ └─── Inactive: bes-amber/30
│ │ └───── Active: bes-amber, 15px (scaled 125%)
│ │         With bes-red ring border (2px)
│ └─────── Inactive: bes-amber/30
└───────── Inactive: bes-amber/30

Spacing: 12px gap
Hover: bes-amber/60
Animation: Spring (stiffness: 300, damping: 30)
```

### 5. Play/Pause Button

```
[⏸] or [▶]
├─ Background: bes-purple/90 → bes-purple (hover)
├─ Icon Color: bes-amber
├─ Size: 48px × 48px (lg: 64px × 64px)
├─ Icon: 28px × 28px
├─ Hover: scale(1.1)
└─ Shadow: lg
```

### 6. Counter

```
3 / 5
├─ Color: bes-amber
├─ Size: 14px (sm: 16px)
├─ Weight: 600 (semibold)
└─ Tracking: wider
```

## 📱 Mobile Layout

```
┌────────────────────────────┐
│                            │
│        GALLERY             │
│        ━━━━━━━             │
│                            │
│  ┌────────────────────┐   │
│  │                    │   │
│  │   ╔════════════╗   │   │
│  │   ║            ║   │   │
│  │   ║  CURRENT   ║   │   │
│  │   ║   IMAGE    ║   │   │
│  │   ║            ║   │   │
│  │   ╚════════════╝   │   │
│  │                    │   │
│  └────────────────────┘   │
│                            │
│     ● ● ⊙ ● ●             │
│                            │
│   [◄]  [⏸]  [►]           │
│                            │
│        3 / 5               │
│                            │
└────────────────────────────┘
```

### Mobile Changes:

- Single image visible (no side cards)
- Controls below image
- Arrows + play/pause in row
- Compact spacing
- Simplified 3D effects

## 🎨 Color Palette Usage

### Primary Actions

```
Navigation Arrows:
  Background: #ffdfa8/90  (bes-amber with 90% opacity)
  Hover:      #ffdfa8     (full bes-amber)
  Icon:       #1d1d1b     (bes-black)

Active Indicator:
  Dot:        #ffdfa8     (bes-amber)
  Ring:       #ff1200     (bes-red)
```

### Secondary Actions

```
Play/Pause:
  Background: #b725e8/90  (bes-purple with 90% opacity)
  Hover:      #b725e8     (full bes-purple)
  Icon:       #ffdfa8     (bes-amber)
```

### Image Borders

```
Active:     4px solid #ffdfa8 (bes-amber)
Inactive:   2px solid #b725e8/50 (bes-purple semi-transparent)
```

### Background

```
Base:           #1d1d1b      (bes-black)
Gradient:       linear-gradient(to bottom-right,
                  bes-black,
                  bes-black,
                  bes-purple/20)

Blur Circles:
  Left-top:     bes-red blur(128px)
  Right-bottom: bes-purple blur(128px)
  Opacity:      10%
```

## ⚡ Animation Timings

```
Slide Transition:
  Duration:     600ms
  Easing:       cubic-bezier(0.43, 0.13, 0.23, 0.96)

Button Hover:
  Duration:     300ms
  Scale:        110%

Dot Indicator:
  Type:         Spring
  Stiffness:    300
  Damping:      30

Auto-play:
  Interval:     5000ms (configurable)

Loading State:
  Fade In:      800ms ease-out
```

## 🎯 Interactive States

### Image Cards

```
Active:
  ✓ Full opacity
  ✓ Centered
  ✓ Amber ring
  ✓ No rotation
  ✓ Highest z-index

Inactive (clickable):
  ✓ 30% opacity
  ✓ Offset left/right
  ✓ Purple ring
  ✓ 15° rotation
  ✓ Hover: Show gradient overlay
  ✓ Click: Navigate to that slide
```

### Buttons

```
Enabled:
  ✓ Full color
  ✓ Hover scale 110%
  ✓ Cursor pointer
  ✓ Shadow-lg

Disabled:
  ✓ 50% opacity
  ✓ No hover effect
  ✓ Cursor not-allowed
```

## 📐 Spacing & Sizes

### Container

```
Max Width:      90rem (1440px)
Padding:
  Mobile:       16px
  Desktop:      24px → 32px
Gap:            32px → 48px (mobile → desktop)
```

### Image Area

```
Aspect Ratio:   16:10 (mobile), 16:9 (desktop)
Max Width:      80rem (1280px)
```

### Controls

```
Gap between elements:   24px
Dot spacing:            8px (mobile), 12px (desktop)
Button size:            48px (mobile), 64px (desktop)
Icon size:              24px (mobile), 32px (desktop)
```

## 🌟 Special Effects

### Decorative Blur Circles

```css
Position: absolute
Size: 256px × 256px (left), 384px × 384px (right)
Blur: 128px
Opacity: 10%
Colors: bes-red (top-left), bes-purple (bottom-right)
```

### Image Overlays

```css
Active image:
  Gradient: linear-gradient(to top,
              rgba(bes-black, 0.3),
              transparent)

Inactive hover:
  Gradient: linear-gradient(to top,
              rgba(bes-black, 0.8),
              transparent)
  Transition: 300ms
```

### Shadow Effects

```css
Cards:      shadow-2xl (large, soft shadow)
Buttons:    shadow-lg + colored glow on active dot
```

---

This visual reference complements the technical implementation and helps visualize the final design!

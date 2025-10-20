# Gallery Slider Implementation Guide

## 🎨 Features

### Innovative Design

- **Tilted Card Stack**: Images appear as stacked cards with 3D perspective transforms
- **Drag/Swipe Navigation**: Touch-friendly swipe gestures for natural navigation
- **Parallax Transitions**: Smooth, physics-based animations using Framer Motion
- **Interactive Hover States**: Non-active images show gradient overlay on hover
- **Corporate Colors**: Integration with bes-red, bes-amber, and bes-purple
- **Responsive Design**: Optimized for mobile and desktop experiences

### Functionality

- ✅ Auto-play with configurable interval (default: 5 seconds)
- ✅ Pause/Play controls
- ✅ Drag/Swipe to navigate (works with touch & mouse)
- ✅ Next/Previous navigation buttons
- ✅ Dot indicators with active state
- ✅ Click-to-navigate on stacked images
- ✅ Image counter display
- ✅ Smooth animation transitions
- ✅ Separated logic (hooks) and UI (components)

## 📁 File Structure

```
src/
├── components/
│   ├── GallerySlider.tsx          # Main gallery component (UI)
│   └── GalleryIcons.tsx            # Icon components
├── hooks/
│   └── useGallerySlider.ts         # Gallery logic hook
└── config/
    └── gallery.ts                  # Configuration & image loader

public/
└── gallery/
    ├── README.md                   # Image guidelines
    ├── gallery-1.webp             # Your images here
    ├── gallery-2.webp
    └── ...
```

## 🚀 Usage

### 1. Add Your Images

Place your compressed WebP images in `/public/gallery/` with names:

- `gallery-1.webp`
- `gallery-2.webp`
- `gallery-3.webp`
- etc.

### 2. Configure Image Count

Edit `/src/config/gallery.ts`:

```typescript
export const GALLERY_CONFIG = {
  autoPlayInterval: 5000, // milliseconds
  autoPlay: true, // enable/disable auto-play
  maxImages: 10, // maximum allowed
  imageCount: 5, // ⚠️ SET THIS to your actual image count
} as const;
```

### 3. Import and Use Component

```tsx
import GallerySlider from "@/components/GallerySlider";

export default function Page() {
  return (
    <div>
      <GallerySlider />
    </div>
  );
}
```

## 🎨 Design System Integration

### Colors Used

- **bes-red** (`#ff1200`): Accent rings, decorative elements
- **bes-amber** (`#ffdfa8`): Primary buttons, active indicators, text
- **bes-purple** (`#b725e8`): Secondary buttons, background gradients
- **bes-black** (`#1d1d1b`): Dark background, overlays

### Typography

- Bold, large titles matching section designs
- Responsive text using `clamp()` functions
- Tracking and spacing consistent with brand

## 📱 Responsive Behavior

### Desktop (sm: 640px+)

- Large card stack with side navigation arrows
- 3D perspective transforms visible
- Controls below slider
- Three images visible (previous, current, next)

### Mobile (< 640px)

- Compact view optimized for vertical space
- Navigation buttons below slider
- Touch-friendly controls
- Simplified 3D effects for performance

## ⚙️ Customization

### Adjust Animation Speed

In `/src/hooks/useGallerySlider.ts`:

```typescript
setTimeout(() => setIsAnimating(false), 600); // Change duration (ms)
```

In `/src/components/GallerySlider.tsx`:

```typescript
transition={{
  duration: 0.6, // Change animation duration (seconds)
  ease: [0.43, 0.13, 0.23, 0.96],
}}
```

### Change Auto-Play Interval

In `/src/config/gallery.ts`:

```typescript
autoPlayInterval: 5000, // Change to desired milliseconds
```

### Disable Auto-Play

In `/src/config/gallery.ts`:

```typescript
autoPlay: false, // Set to false
```

## 🖼️ Image Optimization

### Recommended Settings

- **Format**: WebP
- **Dimensions**: 1920x1080px (16:9) or 1600x900px
- **Quality**: 80-85% (balance between quality and file size)
- **Max File Size**: ~150-250KB per image

### Compression Tools

**Online:**

- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [TinyPNG](https://tinypng.com/) - Also supports WebP

**CLI:**

```bash
# Using cwebp (install via Homebrew: brew install webp)
cwebp -q 80 input.jpg -o output.webp

# Batch convert
for img in *.jpg; do cwebp -q 80 "$img" -o "${img%.jpg}.webp"; done
```

**Mac App:**

- [ImageOptim](https://imageoptim.com/mac)

## 🔧 Troubleshooting

### Images Not Loading

1. Check file names match pattern: `gallery-1.webp`, `gallery-2.webp`, etc.
2. Verify `imageCount` in `/src/config/gallery.ts` matches actual files
3. Ensure images are in `/public/gallery/` folder

### Animation Lagging

1. Reduce image file sizes (compress more)
2. Reduce `imageCount` to fewer images
3. On mobile, 3D transforms may be simplified automatically

### Styling Issues

1. Clear browser cache and restart dev server
2. Check Tailwind CSS config includes custom colors
3. Verify imports are correct

## 🎯 Performance Tips

1. **Lazy load**: Images outside viewport aren't rendered
2. **WebP format**: ~30% smaller than JPEG with same quality
3. **Limited stack**: Only 3 images rendered at once (current + neighbors)
4. **CSS transforms**: Hardware-accelerated for smooth animations
5. **Optimized re-renders**: React memo and useCallback prevent unnecessary renders

## 📝 Accessibility

- ✅ Keyboard navigation support
- ✅ ARIA labels on all controls
- ✅ Semantic HTML structure
- ✅ Proper alt text on images
- ✅ Visible focus states
- ✅ Screen reader friendly

## 🚀 Next Steps

1. Add your images to `/public/gallery/`
2. Update `imageCount` in config
3. Import `<GallerySlider />` where needed
4. Customize colors/timing if desired
5. Test on mobile and desktop

Enjoy your innovative gallery slider! 🎉

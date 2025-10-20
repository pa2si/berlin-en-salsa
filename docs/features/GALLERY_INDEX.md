# 🎨 Gallery Slider - Complete Package

> An innovative, corporate-design-integrated image gallery slider built with Framer Motion for the Berlin en Salsa project.

## 🚀 Quick Start

### 1. Add Your Images

```bash
# Place 5-10 WebP images in the gallery folder:
/public/gallery/
  ├── gallery-1.webp
  ├── gallery-2.webp
  ├── gallery-3.webp
  └── ...
```

### 2. Configure

```typescript
// Edit: src/config/gallery.ts
imageCount: 5,  // Match your actual number of images
```

### 3. Use

```tsx
import GallerySlider from "@/components/GallerySlider";

<GallerySlider />;
```

That's it! 🎉

---

## 📚 Documentation Index

### Getting Started

- **[Summary](./GALLERY_SLIDER_SUMMARY.md)** - Complete overview and checklist
- **[Implementation Guide](./GALLERY_SLIDER_IMPLEMENTATION.md)** - Detailed setup and usage
- **[Integration Examples](./GALLERY_INTEGRATION_EXAMPLES.md)** - 5 ways to integrate

### Reference

- **[Visual Design Reference](./GALLERY_VISUAL_REFERENCE.md)** - Layout diagrams and styling
- **[Image Guidelines](/public/gallery/README.md)** - Compression and optimization

---

## ✨ Key Features

### Innovative Design

- 🎴 **Tilted Card Stack** - 3D perspective with depth
- 👆 **Drag/Swipe Navigation** - Natural touch & mouse gestures
- 🎭 **Parallax Transitions** - Smooth, physics-based animations
- 🎯 **Interactive Cards** - Click side cards to navigate
- 🎨 **Corporate Colors** - bes-red, bes-amber, bes-purple integration
- 📱 **Fully Responsive** - Mobile-first design

### Technical Excellence

- ⚡ **High Performance** - Only 3 images rendered at once
- 🔧 **Separated Logic** - Custom hook architecture
- ♿ **Accessible** - WCAG compliant, keyboard navigation
- 🎮 **Interactive** - Swipe, auto-play, pause, manual controls
- 🏗️ **Type Safe** - Full TypeScript support

---

## 📦 What's Included

### Components

```
src/components/
├── GallerySlider.tsx       # Main UI component
└── GalleryIcons.tsx         # Icon components
```

### Logic & Config

```
src/
├── hooks/
│   └── useGallerySlider.ts  # Gallery state management
└── config/
    └── gallery.ts            # Configuration & utilities
```

### Example & Assets

```
src/app/[locale]/gallery/
└── page.tsx                  # Example usage page

public/gallery/
└── README.md                 # Image guidelines
```

### Documentation

```
docs/features/
├── GALLERY_SLIDER_SUMMARY.md           # Quick overview
├── GALLERY_SLIDER_IMPLEMENTATION.md    # Full guide
├── GALLERY_INTEGRATION_EXAMPLES.md     # Code examples
├── GALLERY_VISUAL_REFERENCE.md         # Design specs
└── GALLERY_INDEX.md                    # This file
```

---

## 🎯 Design System

### Colors

- **Primary**: `bes-amber` (#ffdfa8) - Buttons, active states
- **Accent**: `bes-red` (#ff1200) - Highlights, rings
- **Secondary**: `bes-purple` (#b725e8) - Play button, gradients
- **Background**: `bes-black` (#1d1d1b) - Base, overlays

### Typography

- **Title**: Bold, responsive clamp(2rem → 4rem)
- **Counter**: Semibold, wide tracking
- **Style**: Matches existing section designs

### Animations

- **Duration**: 600ms transitions
- **Easing**: Cubic bezier for smoothness
- **Spring**: Active indicator (stiffness: 300)
- **Hover**: 110% scale on buttons

---

## 🛠️ Configuration Options

### Basic Settings

```typescript
// src/config/gallery.ts
export const GALLERY_CONFIG = {
  autoPlayInterval: 5000, // Time between slides (ms)
  autoPlay: true, // Enable auto-play
  maxImages: 10, // Maximum allowed images
  imageCount: 5, // Your image count (CHANGE THIS)
} as const;
```

### Advanced Customization

```tsx
// Custom hook usage
const gallery = useGallerySlider({
  images: customImages,
  autoPlayInterval: 3000, // 3 seconds
  autoPlay: false, // Manual only
});
```

---

## 📱 Responsive Breakpoints

| Size    | Breakpoint     | Layout                         |
| ------- | -------------- | ------------------------------ |
| Mobile  | < 640px        | Single image, buttons below    |
| Tablet  | 640px - 1024px | Card stack, medium controls    |
| Desktop | > 1024px       | Full 3D effect, large controls |

---

## ⚡ Performance

- **Lazy Rendering**: Only visible images loaded
- **Hardware Acceleration**: CSS transforms use GPU
- **Optimized Re-renders**: React.memo & useCallback
- **WebP Format**: ~30% smaller than JPEG
- **Debounced Controls**: Prevent rapid clicking issues

---

## ♿ Accessibility

- ✅ Keyboard navigation (Arrow keys, Tab, Enter)
- ✅ ARIA labels on all controls
- ✅ Semantic HTML
- ✅ Alt text on images
- ✅ Focus visible states
- ✅ Screen reader friendly

---

## 🔍 Troubleshooting

### Images not showing?

1. Check file names: `gallery-1.webp`, `gallery-2.webp`, etc.
2. Verify files are in `/public/gallery/`
3. Update `imageCount` in config to match actual count

### Animation stuttering?

1. Compress images more (target < 200KB each)
2. Reduce number of images
3. Check browser performance tab

### Styling issues?

1. Verify Tailwind config includes custom colors
2. Clear browser cache
3. Restart dev server

See [Implementation Guide](./GALLERY_SLIDER_IMPLEMENTATION.md) for more help.

---

## 🎓 Learning Resources

### Understanding the Code

1. **Hook Pattern**: `useGallerySlider.ts` - Learn custom hooks
2. **Framer Motion**: `GallerySlider.tsx` - Animation patterns
3. **TypeScript**: Full type safety throughout
4. **Responsive Design**: Mobile-first approach

### External Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [WebP Image Guide](https://developers.google.com/speed/webp)
- [CSS Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

---

## 🔄 Future Enhancements

Possible additions (not implemented):

- [ ] Fullscreen mode
- [ ] Image captions/metadata
- [ ] Drag to navigate
- [ ] Thumbnail preview
- [ ] Zoom on click
- [ ] Video support
- [ ] Loading skeleton
- [ ] Error boundaries

---

## 📄 License

Part of the Berlin en Salsa project.

---

## 🤝 Contributing

To modify or extend:

1. **Logic changes**: Edit `src/hooks/useGallerySlider.ts`
2. **UI changes**: Edit `src/components/GallerySlider.tsx`
3. **Config changes**: Edit `src/config/gallery.ts`
4. **Style changes**: Update Tailwind classes in component

---

## 📞 Support

- **Issues**: Check [Troubleshooting](#-troubleshooting) section
- **Examples**: See [Integration Examples](./GALLERY_INTEGRATION_EXAMPLES.md)
- **Design**: Refer to [Visual Reference](./GALLERY_VISUAL_REFERENCE.md)

---

**Version**: 1.0.0  
**Created**: October 2025  
**Tech Stack**: Next.js 15, React 19, Framer Motion 12, TypeScript 5, Tailwind CSS 4

---

<div align="center">

**Ready to showcase your images in style!** 🎨✨

[Get Started](#-quick-start) • [Docs](#-documentation-index) • [Examples](./GALLERY_INTEGRATION_EXAMPLES.md)

</div>

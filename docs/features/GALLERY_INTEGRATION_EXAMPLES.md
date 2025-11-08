# Gallery Slider — Integration Notes

The gallery UI was consolidated into the homepage section `SectionTwo` (`src/app/[locale]/sections/SectionTwo.tsx`). If you previously used the standalone `GallerySlider` component or the `/gallery` page, prefer the integrated section or create a small wrapper to reuse the gallery UI.

Below are concise integration patterns that match the current codebase.

## Example 1: Use the integrated Section (recommended)

The gallery is part of `SectionTwo`. To show the gallery inside another page or section, import and render `SectionTwo` (or add it to your layout):

```tsx
import SectionTwo from "./sections/SectionTwo";

export default function Page() {
  return (
    <main>
      {/* SectionTwo includes the gallery UI */}
      <SectionTwo />
    </main>
  );
}
```

## Example 2: Create a small standalone wrapper

If you want a dedicated route or section file, create a thin wrapper that re-uses `SectionTwo`'s gallery UI:

```tsx
"use client";

import SectionTwo from "@/app/[locale]/sections/SectionTwo";

export default function SectionGallery() {
  return <SectionTwo />; // reuse the same gallery UI
}
```

## Example 3: Build a custom gallery UI (advanced)

If you need a custom UI, use the gallery loader from `src/config/gallery.ts` to get the image list and implement your own controls (drag, arrows, dots) using Framer Motion.

```tsx
"use client";

import { loadGalleryImages } from "@/config/gallery";

export default function CustomGallery() {
  const images = loadGalleryImages(6); // load N images from /public/gallery

  return (
    <div>
      {images.map((img) => (
        <img key={img.src} src={img.src} alt={img.alt} />
      ))}
    </div>
  );
}
```

### Notes

- The legacy standalone `GallerySlider` component and the `/gallery` example page were removed in favor of the integrated implementation in `SectionTwo`.
- If you used any pre-built examples that imported `GallerySlider`, replace them by either using `SectionTwo` or implementing a custom UI with `loadGalleryImages`.

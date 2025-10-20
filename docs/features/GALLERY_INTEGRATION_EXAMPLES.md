# Gallery Slider - Integration Examples

Choose the integration method that best fits your needs.

## Example 1: Standalone Gallery Page

**File:** `src/app/[locale]/gallery/page.tsx`

```tsx
import GallerySlider from "@/components/GallerySlider";

export default function GalleryPage() {
  return (
    <main>
      <GallerySlider />
    </main>
  );
}
```

## Example 2: As a Section in Main Page

**File:** `src/app/[locale]/page.tsx`

```tsx
import GallerySlider from "@/components/GallerySlider";
import SectionOne from "./sections/SectionOne";
import SectionTwo from "./sections/SectionTwo";
// ... other sections

export default function HomePage() {
  return (
    <main>
      <SectionOne />
      <SectionTwo />
      {/* Insert gallery between sections */}
      <GallerySlider />
      {/* ... other sections */}
    </main>
  );
}
```

## Example 3: Create a New Section Component

**File:** `src/app/[locale]/sections/SectionGallery.tsx`

```tsx
"use client";

import GallerySlider from "@/components/GallerySlider";

const SectionGallery = () => {
  return <GallerySlider />;
};

export default SectionGallery;

export default SectionGallery;
```

Then import in your main page:

```tsx
import SectionGallery from "./sections/SectionGallery";
```

## Example 4: Embedded in Another Component

Add gallery to any existing component.

```tsx
import GallerySlider from "@/components/GallerySlider";

export default function SomeComponent() {
  return (
    <div>
      <h1>Some Content</h1>
      <p>Text here...</p>

      {/* Gallery slider */}
      <GallerySlider />

      <p>More content...</p>
    </div>
  );
}
```

## Example 5: Conditional Rendering

Show gallery only when certain conditions are met.

```tsx
import GallerySlider from "@/components/GallerySlider";

export default function ConditionalGallery() {
  const showGallery = true; // Your condition here

  return <div>{showGallery && <GallerySlider />}</div>;
}
```

## Customization Example

If you need to pass custom configuration:

1. Update `src/config/gallery.ts` with your settings
2. Or create a custom wrapper component:

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGallerySlider } from "@/hooks/useGallerySlider";
import { loadGalleryImages } from "@/config/gallery";
// ... import other dependencies

export default function CustomGallery() {
  // Load custom number of images
  const images = loadGalleryImages(8); // Only 8 images

  // Use hook with custom config
  const galleryState = useGallerySlider({
    images,
    autoPlayInterval: 3000, // 3 seconds instead of 5
    autoPlay: true,
  });

  // Then use galleryState in your custom UI
  return <div>{/* Your custom gallery UI */}</div>;
}
```

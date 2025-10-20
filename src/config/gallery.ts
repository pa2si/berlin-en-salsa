/**
 * Gallery configuration and image loader
 */

export interface GalleryImage {
  src: string;
  alt: string;
}

/**
 * Load gallery images from public folder
 * Images should be named: gallery-1.webp, gallery-2.webp, etc.
 * @param count - Number of images to load (max 10)
 * @returns Array of gallery images
 */
export const loadGalleryImages = (count: number = 10): GalleryImage[] => {
  const images: GalleryImage[] = [];

  for (let i = 1; i <= count; i++) {
    images.push({
      src: `/gallery/gallery-${i}.jpg`,
      alt: `Gallery image ${i}`,
    });
  }

  return images;
};

/**
 * Gallery slider configuration
 */
export const GALLERY_CONFIG = {
  autoPlayInterval: 5000, // 5 seconds
  autoPlay: true,
  maxImages: 10,
  imageCount: 5, // Change this to match actual number of images in /public/gallery
} as const;

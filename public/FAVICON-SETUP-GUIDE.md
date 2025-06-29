# Favicon Setup for Berlin En Salsa

To properly set up favicons for your Berlin En Salsa website, follow these steps:

## Required Favicon Files

1. **favicon.ico** - The basic favicon file that should be 16x16, 32x32, and 48x48 pixels

   - Place in: `/public/favicon.ico`

2. **apple-touch-icon.png** - For iOS devices

   - Size: 180x180 pixels
   - Place in: `/public/apple-touch-icon.png`

3. **favicon-32x32.png** - For most browsers

   - Size: 32x32 pixels
   - Place in: `/public/favicon-32x32.png`

4. **favicon-16x16.png** - For most browsers

   - Size: 16x16 pixels
   - Place in: `/public/favicon-16x16.png`

5. **android-chrome-192x192.png** - For Android devices

   - Size: 192x192 pixels
   - Place in: `/public/android-chrome-192x192.png`

6. **android-chrome-512x512.png** - For Android devices
   - Size: 512x512 pixels
   - Place in: `/public/android-chrome-512x512.png`

## Tools for Creating Favicons

You can use these online tools to generate all the required favicon files from your logo:

1. **Favicon Generator**: https://realfavicongenerator.net/

   - Upload your Berlin-en-Salsa-Logo.png
   - Download the package and extract the files to your public directory

2. **Favicon.io**: https://favicon.io/favicon-converter/
   - Upload your Berlin-en-Salsa-Logo.png
   - Download the package and extract the files to your public directory

## Manual Creation (with image editing software)

If you prefer to create the favicon files manually:

1. Start with your logo image (Berlin-en-Salsa-Logo.png)
2. Create copies at each of the required sizes
3. Make sure the smaller versions are clearly visible (you may need to simplify the design for smaller sizes)
4. Save each version in the appropriate format (.ico for favicon.ico, .png for others)
5. Place all files in the public directory

## Implementation in Next.js

Once you have all the favicon files in the public directory, update your metadata in `layout.tsx`:

```tsx
export const metadata: Metadata = {
  // other metadata
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png" },
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};
```

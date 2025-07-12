Versions:

whats's done:

v 1.0.11

- Map included in SectionFive
  - Links are now not included in Form
  - Footer is now an own component

v 1.0.10

- updated Program for download

v 1.0.9

- updated Privacy for the new font
- corrected title for german SectionOne title under the main logo (19. und 20. Jui)
- SectionTwo corrected double "und" in german version

v 1.0.8

- Changed the Font
  - deleted all adobe new spirit font imports and usage of that in the website.
  - now using Instrument Serif

v 1.0.7

- Updated program images in download modals:
  - Changed image file format from JPEG to PNG for better quality
  - Updated file paths to use new naming convention (program-sabado.png, program-domingo.png)
  - Updated download attributes and MIME types to match new PNG format
- Improved icon display in buttons and modals:
  - ProgramButton and GermanProgramButton now show:
    - Download icon on desktop (sm+) with rotation animation on hover
    - Program sheet icon on mobile (below sm) with pulse animation on hover
  - Download Modal buttons always show download icons with bounce animation for consistency
  - Maintained consistent UI/UX across Spanish and German versions
- Download button is now visible again

  1.0.6

- New images for Program to download
- Donwloadbutton not hidden anymore

v 1.0.5

- download button is now hidden
- Enhanced UI/UX of ComingSoonBanner in both languages:
  - Repositioned close button to bottom-right for improved mobile accessibility
  - Adjusted close button size on mobile devices for better touch targets
  - Improved spacing between title text and countdown elements
  - Enhanced vertical alignment of countdown elements on desktop displays
  - Added proper vertical centering for better visual balance
  - Improved responsive layout for all screen sizes
  - Maintained consistent design across Spanish and German versions

v 1.0.4

- Fixed download functionality by adding MIME type to ensure proper filename preservation
- Set clear descriptive filenames for downloaded program images

v 1.0.3

- Retouched the design of the tabs in downloadModal for clearer active state indication
- Improved tab navigation with visual indicators for active tab selection

v 1.0.2

- Moved countdown to ComingSoonBanner with animated close button and enhanced visibility
- Updated ComingSoonBanner in both Spanish and German to show days, hours, minutes, and seconds
- Created new ProgramDownloadModal allowing users to download festival program images
- Added tab navigation in download modal to toggle between Saturday and Sunday program
- Replaced ProgramButton functionality to open download modal instead of teaser
- Added animated download buttons with visual feedback for better user experience
- Implemented pulsing background effect on ProgramButton for increased visibility
- Fixed UI issues to prevent language button from being obscured
- Maintained full bilingual support with identical features in Spanish and German
- Improved mobile responsiveness across all new components

v 1.0.1

- Added fly-in animation effect for date/location text in both Spanish and German versions of SectionOne
- Converted both SectionOne components to client components
- Implemented Framer Motion for smooth animations
- Added spring physics for more natural movement
- Trigger animations when components enter viewport
- Consistent animation experience across language versions
- Implemented also animation for the T-shirts in SectionFive

v 1.0.0

- release version (same as 0.1.47).
- website is now launched and online

v 0.1.47

- added overflow-y-auto
- corrected dimensions for bes logo in ProgramTeaser and ComingSoonBanner

v 0.1.46

- added <h2> for each Section

v 0.1.45

- added phone number to legal and privacy
- modified 16 DJs to 20 DJs
- added h1 only fro screen reader
- modified keywords in layout.tsx

v 0.1.44

- SectionFive is now fully responsive
  - Title image, social media icons, and text scale based on available height
  - All elements adapt to the viewport height using clamp() for proper scaling

v 0.1.43

- Images selection now depends of screensize in SectionThree
  - for under sm and from xl on we have one image
  - for sm, md and lg we have another image

v 0.1.42

- SectionFour is now fully responsive

v 0.1.41

- SectionThree is now fully responsive

v 0.1.40

- SectionTwo is now fully responsive

v 0.1.39

- SeectionOne is now fully responsive

v 0.1.38

- rest of missing section titles implemented

v 0.1.37

- spanisch titles replaced with the german titles

v 0.1.36

- corrected path for opengraph image in page.tsx

v 0.1.35

- set in the layout.tsx regarding the const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
- created the variable in .env

v 0.1.34

- Updated social media sharing images:
  - Using static opengraph-image.png and twitter-image.png (1200x630px) in the public folder
  - Removed dynamic OG image generation files
  - Updated metadata in both language layouts to reference the new images
  - Fixed WhatsApp and social media preview to only show the logo image
  - Removed PWA support:
  - Deleted site.webmanifest file
  - Removed web-app-manifest icon files
  - Simplified the website to focus on core functionality

v 0.1.33

- corrected text in german SectionOne

v 0.1.32

- adjusted description in german and spanish page.tsx

v 0.1.31

- in SectionThree the image is now chosen depending on the screen size

v 0.1.30

- better error Handling for From submitting in actions.ts
  - more checks
  - better answers
  - console.log removed
- Hero.tsx removed as it was from a very first version

v 0.1.29

- adpated SectionTwo and SectionThree: When there is only one image in the array "image" then the images are dsplayed as normal image and if there are multiple the images are displayed in a carousel

v 0.1.28

- swapped the order of image 3 and 4 in SectionThree

v 0.1.27

- repared robots.ts
- deleted robots.txt

v 0.1.26

- added new images to carousels in SectionTwo and SectionThree

v 0.1.25

- Removed unused Geist and Geist_Mono fonts from both layouts
- Simplified body class in layout files
- Removed unused font CSS variables from globals.css
- Reduced bundle size by removing unnecessary font imports
- Added comprehensive favicon setup for multiple platforms
- Updated metadata to include various favicon sizes
- Created detailed favicon setup guide
- Added support for Android, iOS, and standard browser favicons
- Improved website branding with consistent favicon across all platforms
- Added fallback static OpenGraph and Twitter card images in public folder
- Installed @vercel/og package for dynamic image generation
- Fixed 404 errors for social media preview images
- Simplified dynamic image generation code for better compatibility
- Added hybrid approach with both dynamic and static image options
- Added dynamically generated OpenGraph images for social media sharing
- Created Twitter card images for better visibility on Twitter
- Implemented separate images for Spanish and German versions
- Used site branding colors and elements for visual consistency
- Optimized image generation with Next.js Edge Runtime
- Added auto-generated sitemap.xml for better search engine indexing
- Created robots.txt file to guide search engine crawlers
- Properly linked sitemap in robots.txt for improved SEO
- Configured all routes with appropriate priority and change frequency
- Fixed title format to consistently use "Berlin En Salsa | Page Name" pattern
- Corrected metadata for all pages including Spanish Privacidad and German Datenschutz pages
- Updated site logo reference to Berlin-en-Salsa-Logo.png
- Fixed duplicate Berlin En Salsa in page titles
- Added missing metadata for Privacidad page
- Implemented comprehensive SEO optimization across the site
- Added dynamic title templates for consistent page titles
- Added OpenGraph and Twitter card metadata for better social media sharing
- Implemented proper canonical URLs and language alternates for multilingual SEO
- Added page-specific metadata for homepage, legal, and impressum pages
- Enhanced descriptions with more detailed, keyword-rich content
- Added complete robots directives to improve search engine crawling

v 0.1.24

- new Image for carousel in SectionThree

v 0.1.23

- changed image-section-2.webp

v 0.1.22

- In SectionTwo adapted the german text

v 0.1.21

- Updated German program teaser descriptions to match improved Spanish versions
- Improved text for dance and music workshops in German version for better engagement
- Modified culture icon logic to use the disco SVG image instead of emoji

v 0.1.20

- talleres musicales now is called talleres de musica

v 0.1.19

- Disabled automatic pop-up of program modal for both Spanish and German versions
- Program modal now only appears when the program button is clicked
- ProgramButton now appears after 2 sec.

v 0.1.18

- Changed image galleries in Sections Two and Three to use tap/click interaction instead of swipe
- Removed "Desliza" announcement from image galleries
- Simplified user interaction for better user experience

v 0.1.17

- Improved language switcher scroll behavior with better performance and reliability
- Enhanced language switcher UI with better visibility and smoother transitions
- Fixed issue where language switcher wasn't reliably hiding on scroll

v 0.1.16

- Added touch swipe support for image galleries in Sections Two and Three on mobile devices (only spanish)
- Fixed language switcher hide/show on scroll functionality for mobile devices

v 0.1.15

- Language switcher now hides when scrolling down and reappears when scrolling up on mobile devices

v 0.1.14

- Announcement Banner and Modal and program button implemented for both languages

v 0.1.13

- paypal added to the footer

v 0.1.12

- german version included and triggered via button
- corrected desctiption in spanish Layout:
- deutscher Datenschutz
- spanisch modified
- breadcrump now with logo instead of home text

v 0.1.11

- corrected quotes in privay to get rid of the eslint errors

v 0.1.10

- privacy is now up to date.
- actions.ts is now dealing with double opt in for newsletter
- form has now mentions of US data storage and indicates that a email has been sent instead of successfull subscribed

v 0.1.9

- Form and impressum is now in spanish

v 0.1.8

- bg in impressum now has the logo in the bg with little opacity

v 0.1.7

- updated the spotify link to the actual profile

v 0.1.6

- in SectionFour: changed the svg under the <p> to apoyanos ...

v 0.1.5

- Footer added a bit of pb in mobile view
- the Form has less height in sma sm and md also everything more compact in sm and md.

v 0.1.4

- adapted red colors for the svg
- added carousel in SectionTwo and SectionThree

v 0.1.3

- adapted margins of SectionFour.tsx in mobile view

v 0.1.3

- mb footer in mobile view
- mb footer image in mobile view
- changed all h-dvh to h-svh

v 0.1.3

- first commit of Andres Layout

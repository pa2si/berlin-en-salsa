import { useTranslations } from "next-intl";

interface SlideContent {
  djName?: string;
  dancerName?: string;
  bandName?: string;
  dancerOne?: string;
  dancerTwo?: string;
  djOne?: string;
  djTwo?: string;
}

interface EventNavigationProps {
  currentSlideIndex: number;
  totalSlides: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
  slides?: SlideContent[]; // Optional slides for pill navigation
  eventType?: string;
  presenter?: string;
  record?: string;
}

export default function EventNavigation({
  currentSlideIndex,
  totalSlides,
  onPrevSlide,
  onNextSlide,
  onGoToSlide,
  slides,
  eventType,
  presenter,
  record,
}: EventNavigationProps) {
  const t = useTranslations("Timetable");

  const generatePillLabel = (slide: SlideContent, index: number) => {
    // For Charlas Salseras events with presenter/record
    if (
      eventType === "talk" &&
      presenter &&
      record &&
      slides &&
      slides.length === 2
    ) {
      return index === 0 ? presenter : record;
    }

    return (
      slide?.djName ||
      slide?.dancerName ||
      slide?.bandName ||
      (slide?.dancerOne
        ? slide?.dancerTwo
          ? `${slide.dancerOne} ${t("modal.and")} ${slide.dancerTwo}`
          : slide.dancerOne
        : slide?.djOne && slide?.djTwo
          ? `${slide.djOne} ${t("modal.and")} ${slide.djTwo}`
          : `Slide ${index + 1}`)
    );
  };

  return (
    <div className="mt-4 flex flex-col space-y-3">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevSlide}
          className="bg-bes-red hover:bg-bes-red/80 flex h-8 w-8 items-center justify-center rounded-full font-bold text-white transition-colors hover:cursor-pointer"
          aria-label="Previous slide"
        >
          ←
        </button>

        <div className="md:text-md text-gray-500">
          {currentSlideIndex + 1} / {totalSlides}
        </div>

        <button
          onClick={onNextSlide}
          className="bg-bes-red hover:bg-bes-red/80 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:cursor-pointer"
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* Slide Navigation Pills */}
      {slides && (
        <div className="flex flex-wrap justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`rounded-full px-3 py-1 font-serif text-xs font-medium transition-all hover:cursor-pointer ${
                currentSlideIndex === index
                  ? "bg-bes-red text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {generatePillLabel(slide, index)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface SlideContent {
  image?: string;
  description?: string;
  djName?: string;
  dancerName?: string;
  bandName?: string;
  dancerOne?: string;
  dancerTwo?: string;
  dancerOneDescription?: string;
  dancerTwoDescription?: string;
  combinedDancersDescription?: string;
  djOne?: string;
  djTwo?: string;
  djOneDescription?: string;
  djTwoDescription?: string;
  descriptionTwoDjsTogether?: string;
  genreDescription?: string;
}

interface EventSliderProps {
  slides: SlideContent[];
  currentSlideIndex: number;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export default function EventSlider({
  slides,
  currentSlideIndex,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: EventSliderProps) {
  const t = useTranslations("Timetable");
  const currentSlide = slides[currentSlideIndex];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSlideIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Band or Dancer Name if available - no DJ names since they're already in the DJs field */}
        {(currentSlide?.dancerName ||
          currentSlide?.bandName ||
          currentSlide?.dancerOne) && (
          <h4 className="text-bes-red mb-3 text-xl font-bold">
            {currentSlide?.dancerName ||
              currentSlide?.bandName ||
              (currentSlide?.dancerOne
                ? currentSlide?.dancerTwo
                  ? `${currentSlide?.dancerOne} ${t("modal.and")} ${currentSlide?.dancerTwo}`
                  : currentSlide?.dancerOne
                : null)}
          </h4>
        )}

        {/* Image */}
        {currentSlide?.image && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <Image
              src={currentSlide.image}
              alt={
                currentSlide.dancerName ||
                (currentSlide.dancerOne
                  ? currentSlide.dancerTwo
                    ? `${currentSlide.dancerOne} ${t("modal.and")} ${currentSlide.dancerTwo}`
                    : currentSlide.dancerOne
                  : `Slide ${currentSlideIndex + 1}`)
              }
              width={600}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Description Section */}
        {/* Regular description */}
        {currentSlide?.description && (
          <div className="mb-4">
            <h4 className="text-bes-red mb-2 text-xl font-bold">
              {t("modal.description")}
            </h4>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide.description}
            </p>
          </div>
        )}

        {/* Dancer descriptions */}
        {currentSlide?.dancerOne && currentSlide?.dancerOneDescription && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.dancerOne}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.dancerOneDescription}
            </p>
          </div>
        )}

        {currentSlide?.dancerTwo && currentSlide?.dancerTwoDescription && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.dancerTwo}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.dancerTwoDescription}
            </p>
          </div>
        )}

        {/* Combined Dancers Description - only show if individual descriptions aren't available */}
        {currentSlide?.dancerOne &&
          currentSlide?.combinedDancersDescription &&
          !currentSlide?.dancerOneDescription &&
          (!currentSlide?.dancerTwo || !currentSlide?.dancerTwoDescription) && (
            <div className="mb-4">
              <h5 className="text-bes-red mb-2 text-xl font-bold">
                {currentSlide?.dancerTwo
                  ? `${currentSlide?.dancerOne} ${t("modal.and")} ${currentSlide?.dancerTwo}`
                  : currentSlide?.dancerOne}
              </h5>
              <p className="text-xl text-gray-700 md:leading-relaxed">
                {currentSlide?.combinedDancersDescription}
              </p>
            </div>
          )}

        {/* DJ descriptions */}
        {currentSlide?.djOne && currentSlide?.djOneDescription && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.djOne}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.djOneDescription}
            </p>
          </div>
        )}

        {currentSlide?.djTwo && currentSlide?.djTwoDescription && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.djTwo}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.djTwoDescription}
            </p>
          </div>
        )}

        {/* Combined DJs Description */}
        {currentSlide?.descriptionTwoDjsTogether && (
          <div className="bg-bes-amber/10 mt-6 mb-4 rounded-lg p-3">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.djOne && currentSlide?.djTwo
                ? `${currentSlide?.djOne} & ${currentSlide?.djTwo} juntos`
                : "Colaboración"}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.descriptionTwoDjsTogether}
            </p>
          </div>
        )}

        {/* Genre Description */}
        {currentSlide?.genreDescription && (
          <div className="bg-bes-amber/10 mt-6 mb-4 rounded-lg p-3">
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.genreDescription}
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface SlideContent {
  image?: string;
  description?: string;
  bio?: string;
  djName?: string;
  dancer?: string; // Single dancer field
  dancerName?: string;
  bandName?: string;
  dancerOne?: string;
  dancerTwo?: string;
  dancerOneBio?: string;
  dancerTwoBio?: string;
  combinedDancersDescription?: string;
  djOne?: string;
  djTwo?: string;
  djOneBio?: string;
  djTwoBio?: string;
  descriptionTwoDjsTogether?: string;
  showCombinedDescription?: boolean; // Flag to show combined description with special styling
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
  const tGlobal = useTranslations(); // Access global translations
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
        {/* Image */}
        {currentSlide?.image && (
          <div className="mb-4">
            {/* Act's name above image - only show for dancers when there are multiple slides, not for DJs */}
            {slides.length > 1 &&
              (currentSlide?.dancerName ||
                currentSlide?.dancer ||
                currentSlide?.dancerOne) && (
                <h3 className="text-bes-red mb-3 text-xl font-bold">
                  {(() => {
                    const name =
                      currentSlide?.dancerName ||
                      currentSlide?.dancer ||
                      (currentSlide?.dancerOne
                        ? currentSlide?.dancerTwo
                          ? `${currentSlide?.dancerOne} ${t("modal.and")} ${currentSlide?.dancerTwo}`
                          : currentSlide?.dancerOne
                        : "");

                    if (name.startsWith("Timetable.")) {
                      try {
                        const key = name.substring(10);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return (t as any)(key);
                      } catch {
                        return name;
                      }
                    }
                    return name;
                  })()}
                </h3>
              )}

            <div className="overflow-hidden rounded-lg">
              <Image
                src={currentSlide.image}
                alt={
                  currentSlide.dancerName ||
                  currentSlide.dancer ||
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
          </div>
        )}

        {/* Description Section - Combined to avoid duplicates */}
        {/* Show description or bio, but prioritize description if both exist */}
        {(currentSlide?.description || currentSlide?.bio) &&
          !currentSlide?.showCombinedDescription && (
            <div className="mb-4">
              <h4 className="text-bes-red mb-2 text-xl font-bold">
                {t("modal.description")}
              </h4>
              <p className="text-xl text-gray-700 md:leading-relaxed">
                {(() => {
                  // Prioritize description over bio to avoid duplicates
                  const content = currentSlide.description || currentSlide.bio;
                  if (content?.startsWith("Timetable.")) {
                    try {
                      const key = content.substring(10);
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      return (t as any)(key);
                    } catch {
                      return content;
                    }
                  }
                  return content;
                })()}
              </p>
            </div>
          )}
        {/* Dancer descriptions */}
        {currentSlide?.dancerOne && currentSlide?.dancerOneBio && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.dancerOne}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.dancerOneBio}
            </p>
          </div>
        )}

        {currentSlide?.dancerTwo && currentSlide?.dancerTwoBio && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.dancerTwo}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.dancerTwoBio}
            </p>
          </div>
        )}

        {/* Combined Dancers Description - only show if individual descriptions aren't available */}
        {currentSlide?.dancerOne &&
          currentSlide?.combinedDancersDescription &&
          !currentSlide?.dancerOneBio &&
          (!currentSlide?.dancerTwo || !currentSlide?.dancerTwoBio) && (
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
        {currentSlide?.djOne && currentSlide?.djOneBio && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.djOne}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.djOneBio}
            </p>
          </div>
        )}

        {currentSlide?.djTwo && currentSlide?.djTwoBio && (
          <div className="mb-4">
            <h5 className="text-bes-red mb-2 text-xl font-bold">
              {currentSlide?.djTwo}
            </h5>
            <p className="text-xl text-gray-700 md:leading-relaxed">
              {currentSlide?.djTwoBio}
            </p>
          </div>
        )}

        {/* Combined Description with Special Styling */}
        {currentSlide?.showCombinedDescription &&
          currentSlide?.description &&
          currentSlide?.djOne &&
          currentSlide?.djTwo && (
            <div className="from-bes-amber/15 to-bes-red/10 border-bes-red mt-6 mb-4 rounded-lg border-l-4 bg-gradient-to-r p-4">
              <h5 className="text-bes-red mb-3 text-xl font-bold">
                {`${currentSlide.djOne} & ${currentSlide.djTwo} ${tGlobal("Timetable.modal.together" as never)}`}
              </h5>
              <p className="text-xl text-gray-700 md:leading-relaxed">
                {currentSlide.description}
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

const SectionOne = () => {
  return (
    <div className="flex h-auto w-full flex-col overflow-hidden sm:flex-row xl:h-svh">
      <div className="bg-bes-amber flex h-svh items-center justify-center sm:w-1/2">
        <div className="flex flex-col items-center">
          <img
            src="/bes-logo-color.webp"
            alt="Berlin en Salsa Logo"
            className="w-[19.5rem] sm:w-[10rem] lg:w-[22rem]"
          />
          <p className="text-bes-red sm:text-w-[1rem] text-center text-4xl sm:mb-4 lg:text-[3rem] xl:text-[3.5rem]">
            19. und 20. Juli <br /> Neulich Biergarten
          </p>
        </div>
      </div>

      <div
        className="flex h-svh flex-col items-center justify-center gap-10 bg-cover sm:w-1/2 sm:gap-4 lg:gap-10"
        style={{
          backgroundImage: 'url("/bes-section-1-bg.webp")',
          backgroundPosition: "100% 40%",
        }}
      >
        <div className="text-bes-amber flex flex-col items-center gap-4 text-6xl sm:text-[2rem] lg:text-[5rem] xl:gap-3 xl:text-[5.5rem] 2xl:gap-4">
          <p>Ein Salsa-</p>
          <p>festival</p>
          <p>für alle:</p>
          <p>kostenlos</p>
          <p>und unter</p>
          <p>freiem Himmel!</p>
        </div>
        <img
          src="/disco.svg"
          alt="Disco Dekoration"
          className="w-40 sm:w-24 lg:w-40"
        />
      </div>
    </div>
  );
};
export default SectionOne;

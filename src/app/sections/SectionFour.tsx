const SectionFour = () => {
  return (
    <>
      {/* Mobile layout (only visible below sm) */}
      <div className="bg-bes-purple flex h-svh flex-col items-center justify-around overflow-auto sm:hidden">
        <img
          src="/como-se-financia-berlin-en-salsa.svg"
          alt="Como se financia Berlin en Salsa"
          className="mx-auto w-[80vw] max-w-[33rem] min-w-[13rem]"
        />

        <p className="text-bes-amber min-text-lg max-text-2xl px-2 text-center text-[6vw]">
          Berlin en Salsa no cuenta con financiación pública ni patrocinio
          comercial.
        </p>

        <p className="text-bes-amber min-text-lg max-text-2xl px-2 text-center text-[6vw]">
          Somos un festival hecho por y para la comunidad salsera, y nos
          financiamos únicamente a través de la venta de camisetas y sus
          donaciones.
        </p>

        <img
          src="/ponte.svg"
          alt="Ponte tu camiseta"
          className="m-4 mx-auto w-[30vw] max-w-[10rem] min-w-[6rem]"
        />

        <div className="flex w-full items-center justify-around gap-4 px-4">
          <img
            src="/bes-camiseta-white.webp"
            alt="Berlin en Salsa white t-shirt"
            className="w-[40vw] max-w-[15rem] min-w-[6rem]"
          />
          <img
            src="/bes-camiseta-black.webp"
            alt="Berlin en Salsa black t-shirt"
            className="w-[40vw] max-w-[15rem] min-w-[6rem]"
          />
        </div>
      </div>

      {/* New sm to lg layout (2-column layout) */}
      <div className="bg-bes-purple hidden h-svh w-full grid-cols-2 overflow-auto sm:grid lg:grid xl:hidden">
        {/* Left column - Financing information */}
        <div className="flex flex-col items-center justify-center p-2 lg:p-8">
          <img
            src="/como-se-financia-berlin-en-salsa.svg"
            alt="Como se financia Berlin en Salsa"
            className="mx-auto w-[95%] max-w-[20rem]"
          />

          <div className="mt-1 space-y-4 lg:mt-8 lg:space-y-6">
            <p className="text-bes-amber text-center text-xl sm:text-2xl lg:text-3xl">
              Berlin en Salsa no cuenta con financiación pública ni patrocinio
              comercial.
            </p>

            <p className="text-bes-amber text-center text-xl sm:text-2xl lg:text-3xl">
              Somos un festival hecho por y para la comunidad salsera, y nos
              financiamos únicamente a través de la venta de camisetas y sus
              donaciones.
            </p>
          </div>
        </div>

        {/* Right column - T-shirts */}
        <div className="flex flex-col items-center justify-center sm:p-8">
          <img
            src="/ponte.svg"
            alt="Ponte tu camiseta"
            className="mb-5 w-[60%] sm:max-w-[8rem] lg:mb-6"
          />

          <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
            <img
              src="/bes-camiseta-white.webp"
              alt="Berlin en Salsa white t-shirt"
              className="w-[45%] max-w-[8rem] lg:max-w-[12rem]"
            />
            <img
              src="/bes-camiseta-black.webp"
              alt="Berlin en Salsa black t-shirt"
              className="w-[45%] max-w-[8rem] lg:max-w-[12rem]"
            />
          </div>
        </div>
      </div>

      {/* Desktop layout (only visible at xl and above) */}
      <div className="bg-bes-purple hidden h-svh grid-cols-3 overflow-auto px-8 xl:grid">
        <div className="flex items-center justify-center">
          <img
            src="/bes-camiseta-white.webp"
            alt="Berlin en Salsa white t-shirt"
            className="w-full px-4"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-4 sm:space-y-4 md:space-y-2 lg:space-y-6 2xl:gap-8">
          <div>
            <img
              src="/como-se-financia-berlin-en-salsa.svg"
              alt="Como se financia Berlin en Salsa"
              className="mx-auto max-w-[32rem] min-w-[27rem]"
            />
          </div>

          <p className="text-bes-amber text-center lg:text-2xl xl:text-3xl">
            Berlin en Salsa no cuenta con financiación pública ni patrocinio
            comercial.
          </p>
          <p className="text-bes-amber text-center lg:text-2xl xl:text-3xl">
            Somos un festival hecho por y para la comunidad salsera, y nos
            financiamos únicamente a través de la venta de camisetas y sus
            donaciones.
          </p>
          <img
            src="/ponte.svg"
            alt="Ponte tu camiseta"
            className="mx-auto max-w-[11rem] min-w-[10rem]"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/bes-camiseta-black.webp"
            alt="Berlin en Salsa black t-shirt"
            className="w-full px-4"
          />
        </div>
      </div>
    </>
  );
};
export default SectionFour;

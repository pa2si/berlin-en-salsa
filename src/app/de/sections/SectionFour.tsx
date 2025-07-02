const SectionFour = () => {
  return (
    <>
      {/* Mobile layout (only visible below sm) */}
      <div className="bg-bes-purple flex h-svh flex-col items-center justify-around overflow-auto sm:hidden">
        <img
          src="/wie-finanziert-sich-berlin-en-salsa.svg"
          alt="Wie finanziert sich Berlin en Salsa"
          className="mx-auto w-[75vw] max-w-[33rem] min-w-[13rem]"
        />

        <p className="text-bes-amber min-text-lg max-text-2xl -mt-4 px-2 text-center text-[6vw]">
          Berlin en Salsa erhält keine öffentliche Finanzierung oder
          kommerzielle Sponsoren.
        </p>

        <p className="text-bes-amber min-text-lg max-text-2xl -mt-4 px-2 text-center text-[6vw]">
          Wir sind ein Festival von und für die Salsa-Community und finanzieren
          uns ausschließlich durch den Verkauf von T-Shirts und Ihre Spenden.
        </p>

        <img
          src="/unterstuetze-uns-dabei.svg"
          alt="Unterstütze uns durch den Kauf eines T-Shirts"
          className="mx-auto w-[70vw] max-w-[25rem] min-w-[14rem]"
        />

        <div className="-mt-2 flex w-full items-center justify-around gap-4 px-4">
          <img
            src="/bes-camiseta-white.webp"
            alt="Berlin en Salsa weißes T-Shirt"
            className="w-[40vw] max-w-[15rem] min-w-[6rem]"
          />
          <img
            src="/bes-camiseta-black.webp"
            alt="Berlin en Salsa schwarzes T-Shirt"
            className="w-[40vw] max-w-[15rem] min-w-[6rem]"
          />
        </div>
      </div>

      {/* New sm to lg layout (2-column layout) */}
      <div className="bg-bes-purple hidden h-svh w-full grid-cols-2 overflow-auto sm:grid lg:grid xl:hidden">
        {/* Left column - Financing information */}
        <div className="flex flex-col items-center justify-center p-2 lg:p-8">
          <img
            src="/wie-finanziert-sich-berlin-en-salsa.svg"
            alt="Wie finanziert sich Berlin en Salsa"
            className="mx-auto w-[95%] max-w-[20rem]"
          />

          <div className="mt-1 space-y-4 lg:mt-8 lg:space-y-6">
            <p className="text-bes-amber text-center text-xl sm:text-2xl lg:text-3xl">
              Berlin en Salsa erhält keine öffentliche Finanzierung oder
              kommerzielle Sponsoren.
            </p>

            <p className="text-bes-amber text-center text-xl sm:text-2xl lg:text-3xl">
              Wir sind ein Festival von und für die Salsa-Community und
              finanzieren uns ausschließlich durch den Verkauf von T-Shirts und
              Ihre Spenden.
            </p>
          </div>
        </div>

        {/* Right column - T-shirts */}
        <div className="flex flex-col items-center justify-center sm:p-8">
          <img
            src="/unterstuetze-uns-dabei.svg"
            alt="Unterstütze uns durch den Kauf eines T-Shirts"
            className="mb-5 w-[100%] sm:max-w-[30rem] lg:mb-6"
          />

          <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
            <img
              src="/bes-camiseta-white.webp"
              alt="Berlin en Salsa weißes T-Shirt"
              className="w-[45%] max-w-[15rem] lg:max-w-[12rem]"
            />
            <img
              src="/bes-camiseta-black.webp"
              alt="Berlin en Salsa schwarzes T-Shirt"
              className="w-[45%] max-w-[15rem] lg:max-w-[12rem]"
            />
          </div>
        </div>
      </div>

      {/* Desktop layout (only visible at xl and above) */}
      <div className="bg-bes-purple hidden h-svh grid-cols-3 overflow-auto px-8 xl:grid">
        <div className="flex items-center justify-center">
          <img
            src="/bes-camiseta-white.webp"
            alt="Berlin en Salsa weißes T-Shirt"
            className="w-full px-4"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-4 sm:space-y-4 md:space-y-2 lg:space-y-6 2xl:gap-8">
          <div>
            <img
              src="/wie-finanziert-sich-berlin-en-salsa.svg"
              alt="Wie finanziert sich Berlin en Salsa"
              className="mx-auto max-w-[28rem] min-w-[27rem] xl:-mr-5"
            />
          </div>

          <p className="text-bes-amber text-center lg:text-2xl xl:text-3xl">
            Berlin en Salsa erhält keine öffentliche Finanzierung oder
            kommerzielle Sponsoren.
          </p>
          <p className="text-bes-amber text-center lg:text-2xl xl:text-3xl">
            Wir sind ein Festival von und für die Salsa-Community und
            finanzieren uns ausschließlich durch den Verkauf von T-Shirts und
            Ihre Spenden.
          </p>
          <img
            src="/unterstuetze-uns-dabei.svg"
            alt="Unterstütze uns durch den Kauf eines T-Shirts"
            className="mx-auto max-w-[23rem] min-w-[10rem]"
          />
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/bes-camiseta-black.webp"
            alt="Berlin en Salsa schwarzes T-Shirt"
            className="w-full px-4"
          />
        </div>
      </div>
    </>
  );
};
export default SectionFour;

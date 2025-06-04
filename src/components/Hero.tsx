const Hero = () => {
  return (
    <div className="flex h-dvh w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <img
          src="/bes-logo-color.webp"
          alt="Berlin en Salsa Logo"
          className="max-h-[60vh] w-auto object-contain px-4"
        />
        <div className="max-w-3/4 text-center text-3xl md:max-w-full">
          Hier entsteht demnächst unsere Homepage
        </div>
        <div className="text-center text-xl">
          email:{" "}
          <a
            href="mailto:kontakt@berlinensalsa.de"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            kontakt@berlinensalsa.de
          </a>
        </div>
      </div>
    </div>
  );
};
export default Hero;

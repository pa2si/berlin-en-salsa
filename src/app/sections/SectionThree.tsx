const SectionThree = () => {
  return (
    <div className="flex h-auto w-screen flex-col overflow-hidden sm:flex-row xl:h-dvh">
      <div className="bg-bes-red flex h-dvh items-center sm:w-1/2">
        <div className="text-bes-amber ml-3 flex flex-col gap-12 sm:ml-8 sm:gap-2 lg:ml-3 lg:gap-12 xl:ml-20">
          <img
            src="/berlin-en-salsa-se-viene-con-todo.svg"
            alt="Berlin en Salsa se viene con todo!"
            className="-ml-1 w-[28rem] sm:w-[16rem] lg:ml-4 lg:w-[30rem]"
          />
          <div className="ml-1 flex flex-col gap-2 text-[2.2rem] sm:gap-0 sm:text-2xl lg:ml-6 lg:gap-2 lg:text-5xl xl:gap-3">
            <p>2 días de pura salsa!</p>
            <p>6 orquestas en vivo</p>
            <p>6 shows de baile</p>
            <p>16 DJs</p>
            <p>Charlas</p>
            <p>Talleres musicales</p>
            <p>Mercado de vinilos</p>
            <p>Delicias latinas y más!</p>
          </div>
        </div>
      </div>
      <div
        className="flex h-dvh items-center justify-center bg-cover bg-center sm:w-1/2"
        style={{
          backgroundImage: 'url("/image-section-3.webp")',
          backgroundPosition: "50% 50%",
        }}
      />
    </div>
  );
};
export default SectionThree;

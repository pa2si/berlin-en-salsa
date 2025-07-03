import { SubscribeSection } from "@/components/SubscribeSesction";
import { Footer } from "@/components/Footer";

const SectionFive = () => {
  return (
    <div className="bg-bes-amber flex h-svh flex-col overflow-y-auto">
      <div className="flex w-full flex-1 flex-col justify-between">
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 px-4 md:gap-4">
          <div className="mb-6 flex w-full justify-center sm:mb-2">
            <img
              src="/contacto.svg"
              alt="Contacto"
              className="mt-0 w-[clamp(14rem,25vh,25rem)] object-contain sm:mt-2"
            />
          </div>

          {/* Social Media Links */}
          <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-[clamp(0.5rem,2vh,1.5rem)] md:gap-[clamp(1rem,3vh,2rem)]">
            <a
              href="https://www.instagram.com/berlinensalsa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1 h-[clamp(1.5rem,4vh,2.2rem)] w-[clamp(1.5rem,4vh,2.2rem)]"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-[clamp(1rem,3vh,1.4rem)] font-bold">
                Instagram
              </span>
            </a>

            <a
              href="mailto:info@berlinensalsa.com"
              className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1 h-[clamp(1.5rem,4vh,2.2rem)] w-[clamp(1.5rem,4vh,2.2rem)]"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <span className="text-[clamp(1rem,3vh,1.4rem)] font-bold">
                Email
              </span>
            </a>

            <a
              href="https://open.spotify.com/user/31cin24rvdxaothpsseizytsorxq?si=c0624aeb6b6e4906"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1 h-[clamp(1.5rem,4vh,2.2rem)] w-[clamp(1.5rem,4vh,2.2rem)]"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.192 0-.286-.093-.477-.186-1.241-.74-2.764-1.108-4.435-1.108a8.46 8.46 0 00-2.54.28c-.093.045-.209.093-.304.093a.387.387 0 01-.381-.395c0-.232.126-.371.297-.418.93-.28 1.953-.418 3.02-.418 1.85 0 3.515.418 4.94 1.23.209.14.304.279.304.464a.388.388 0 01-.424.458zm1.085-2.417c-.228 0-.365-.093-.518-.185a12.772 12.772 0 00-5.613-1.349c-1.193 0-1.953.14-2.764.325a1.023 1.023 0 01-.241.046.506.506 0 01-.518-.51c0-.279.16-.464.425-.51.958-.232 1.915-.418 3.323-.418 2.09 0 4.18.464 5.848 1.3.228.14.381.325.381.557 0 .278-.207.51-.49.51l-.333.044zm1.24-2.788a.61.61 0 01-.593-.604c0-.325.193-.51.426-.604 2.375-.697 5.055-1.068 7.935-1.068 2.955 0 5.7.37 8.045 1.068.228.093.424.279.424.604a.61.61 0 01-.595.604c-.15 0-.243-.045-.471-.138-2.09-.65-4.564-.975-7.402-.975-2.84 0-5.38.325-7.43.975-.15.093-.243.138-.339.138z" />
              </svg>
              <span className="text-[clamp(1rem,3vh,1.4rem)] font-bold">
                Spotify
              </span>
            </a>

            <a
              href="linktr.ee/BerlinEnSalsa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bes-red hover:text-bes-red/80 flex items-center transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-1 h-[clamp(1.5rem,4vh,2.2rem)] w-[clamp(1.5rem,4vh,2.2rem)]"
              >
                <path d="M7.953 15.066c-.08 0-.157-.02-.228-.06a.438.438 0 01-.187-.58l2.7-4.87a.99.99 0 011.025-.539.991.991 0 01.844.8l.132.446c.089.308.24.683.345.817.11.135.24.216.483.216.241 0 .342-.08.4-.214.06-.135.182-.5.27-.817l.133-.446a.99.99 0 01.842-.8.99.99 0 011.025.54l2.7 4.868a.438.438 0 01-.188.581.454.454 0 01-.612-.145l-2.701-4.868c-.154.511-.337 1.042-.6 1.45-.311.483-.817.85-1.587.85-.768 0-1.255-.367-1.566-.85-.264-.406-.446-.932-.6-1.45l-2.701 4.869a.446.446 0 01-.384.202zM12 4.85a.85.85 0 100 1.7.85.85 0 000-1.7zm0 8.3a.85.85 0 100 1.7.85.85 0 000-1.7zm-3.85-4.15a.85.85 0 100 1.7.85.85 0 000-1.7zm7.7 0a.85.85 0 100 1.7.85.85 0 000-1.7zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
              <span className="text-[clamp(1rem,3vh,1.4rem)] font-bold">
                Linktree
              </span>
            </a>
          </div>

          <div className="mx-auto w-full max-w-4xl">
            <SubscribeSection />
          </div>
        </div>

        <div className="mt-auto w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SectionFive;

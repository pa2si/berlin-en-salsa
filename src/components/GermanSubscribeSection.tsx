"use client";

import { useState, FormEvent } from "react";
import { addSubscriber } from "@/app/de/actions";

export const SubscribeSection = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState<string>("");
  const [subscribeError, setSubscribeError] = useState<string>("");
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!privacyChecked) {
      setSubscribeError(
        "Sie müssen die Datenschutzrichtlinie akzeptieren, um sich anzumelden.",
      );
      return;
    }

    setIsPending(true);
    setSubscribeSuccess("");
    setSubscribeError("");
    const formData = new FormData(e.currentTarget);
    formData.append("privacyAccepted", "true");

    const res = await addSubscriber(formData);
    if (res.successMessage) {
      setSubscribeSuccess(res.successMessage);
    } else if (res.errorMessage) {
      setSubscribeError(res.errorMessage);
    }
    setIsPending(false);
  };

  return (
    <div className="h-auto w-full px-5 py-2 sm:px-3 sm:py-0 md:px-4 md:py-0 lg:px-5 lg:py-4">
      <div className="mx-auto max-w-[700px]">
        {" "}
        <div className="text-bes-red mb-3 text-center text-xl font-bold sm:mb-2 sm:text-xl md:mb-3 md:text-2xl lg:mb-6 lg:text-3xl">
          Melden dich für unseren Newsletter an
        </div>
        <form
          className="flex flex-col items-center justify-center gap-y-4 sm:gap-y-2 md:gap-y-3 lg:gap-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col items-center justify-center gap-y-4 sm:flex-col sm:gap-y-4 lg:gap-y-4">
            {" "}
            <input
              type="text"
              name="firstName"
              className="text-bes-purple border-bes-purple placeholder-bes-purple/70 h-12 w-full rounded-lg border-2 bg-white px-4 sm:h-9 sm:w-full sm:px-3 md:h-10 md:px-3 lg:h-12 lg:w-full lg:px-4"
              placeholder="Vorname"
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-záéíóúÁÉÍÓÚüÜñÑäöüÄÖÜß\s-]+"
              title="Bitte geben Sie einen gültigen Namen ein (nur Buchstaben, Leerzeichen und Bindestriche)"
            />
            <input
              type="text"
              name="lastName"
              className="text-bes-purple border-bes-purple placeholder-bes-purple/70 h-12 w-full rounded-lg border-2 bg-white px-4 sm:h-9 sm:w-full sm:px-3 md:h-10 md:px-3 lg:h-12 lg:w-full lg:px-4"
              placeholder="Nachname"
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-záéíóúÁÉÍÓÚüÜñÑäöüÄÖÜß\s-]+"
              title="Bitte geben Sie einen gültigen Nachnamen ein (nur Buchstaben, Leerzeichen und Bindestriche)"
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:flex-row">
            {" "}
            <input
              type="email"
              name="email"
              className="text-bes-purple border-bes-purple placeholder-bes-purple/70 h-12 w-full rounded-lg border-2 bg-white px-4 sm:h-9 sm:w-full sm:px-3 md:h-10 md:px-3 lg:h-12 lg:w-full lg:px-4"
              placeholder="E-Mail-Adresse"
              required
              maxLength={320}
              pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
              title="Bitte geben Sie eine gültige E-Mail-Adresse ein"
              autoComplete="email"
              spellCheck="false"
            />
          </div>

          <div className="flex w-full flex-col items-center gap-4 sm:gap-2 md:gap-3 lg:gap-8">
            <div className="flex w-full items-start gap-2 font-semibold sm:gap-1 md:gap-1.5 lg:gap-2">
              <input
                type="checkbox"
                id="privacy-checkbox"
                name="privacy-checkbox"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                className="mt-1 h-5 w-5 flex-shrink-0 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-5 lg:w-5"
              />
              <label
                htmlFor="privacy-checkbox"
                className="text-bes-purple text-sm font-semibold sm:text-xs md:text-xs lg:text-sm"
              >
                Ich akzeptiere die{" "}
                <a
                  href="/de/privacy"
                  className="text-bes-red hover:text-bes-red/80 underline"
                >
                  Datenschutzrichtlinie
                </a>{" "}
              </label>
            </div>

            <div className="w-full">
              <button
                className="bg-bes-red hover:bg-bes-red/90 h-12 w-full cursor-pointer rounded-lg text-base font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:text-sm md:h-10 md:text-sm lg:h-12 lg:text-base"
                disabled={isPending || !privacyChecked}
                onClick={(e) => {
                  if (!privacyChecked) {
                    e.preventDefault();
                    setSubscribeError(
                      "Bitte akzeptieren Sie die Datenschutzrichtlinie, um fortzufahren.",
                    );
                  }
                }}
                aria-describedby="privacy-error"
              >
                {isPending ? "Wird gesendet..." : "ABONNIEREN"}
              </button>
              <div className="h-6 sm:h-5 md:h-5 lg:h-6">
                {!privacyChecked && (
                  <p
                    id="privacy-error"
                    className="text-bes-red mt-2 text-center text-sm sm:mt-1 sm:text-xs md:mt-1.5 md:text-xs lg:mt-2 lg:text-sm"
                    role="alert"
                    aria-live="polite"
                  >
                    Bitte akzeptieren Sie die Datenschutzrichtlinie, um
                    fortzufahren
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="mt-1 flex items-center justify-center sm:mt-1 md:mt-1.5 lg:mt-2 lg:h-10">
          {subscribeSuccess && (
            <p className="bg-bes-purple/10 text-bes-purple rounded-lg px-3 py-1 text-sm font-bold sm:px-2 sm:py-0.5 sm:text-xs md:px-3 md:py-1 md:text-xs lg:px-4 lg:py-2 lg:text-sm">
              {subscribeSuccess}
            </p>
          )}
          {subscribeError && (
            <p className="bg-bes-red/10 text-bes-red rounded-lg px-3 py-1 text-sm font-bold sm:px-2 sm:py-0.5 sm:text-xs md:px-3 md:py-1 md:text-xs lg:px-4 lg:py-2 lg:text-sm">
              {subscribeError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

"use client";

import { useState, FormEvent } from "react";
import { addSubscriber } from "@/app/actions";

export const SubscribeSection = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState<string>("");
  const [subscribeError, setSubscribeError] = useState<string>("");
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!privacyChecked) {
      setSubscribeError("You must accept the privacy policy to subscribe.");
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
    <div className="h-auto px-5 py-2 md:py-4">
      <div className="mx-auto max-w-[700px]">
        {" "}
        <div className="text-bes-red mb-3 text-center text-xl font-bold sm:text-3xl md:mb-4 md:text-2xl">
          Subscribe to our newsletter
        </div>
        <form
          className="flex flex-col items-center justify-center gap-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:flex-row">
            {" "}
            <input
              type="text"
              name="firstName"
              className="text-bes-purple border-bes-purple placeholder-bes-purple/70 h-12 w-full rounded-lg border-2 bg-white px-4 sm:w-[48%]"
              placeholder="First name"
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s-]+"
              title="Please enter a valid first name (letters, spaces, and hyphens only)"
            />
            <input
              type="text"
              name="lastName"
              className="text-bes-purple border-bes-purple placeholder-bes-purple/70 h-12 w-full rounded-lg border-2 bg-white px-4 sm:w-[48%]"
              placeholder="Last name"
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s-]+"
              title="Please enter a valid last name (letters, spaces, and hyphens only)"
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-4 sm:flex-row">
            {" "}
            <input
              type="email"
              name="email"
              className="text-bes-purple border-bes-purple placeholder-bes-purple/70 h-12 w-full rounded-lg border-2 bg-white px-4 sm:w-[100%]"
              placeholder="Email address"
              required
              maxLength={320}
              pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*"
              title="Please enter a valid email address"
              autoComplete="email"
              spellCheck="false"
            />
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-start gap-2">
              <input
                type="checkbox"
                id="privacy-checkbox"
                name="privacy-checkbox"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                className="mt-1 h-5 w-5 flex-shrink-0"
              />
              <label
                htmlFor="privacy-checkbox"
                className="text-bes-purple text-sm"
              >
                Acepto la{" "}
                <a
                  href="/privacy"
                  className="text-bes-red hover:text-bes-red/80 underline"
                >
                  Política de Privacidad
                </a>
              </label>
            </div>

            <div className="w-full">
              <button
                className="bg-bes-red hover:bg-bes-red/90 h-12 w-full cursor-pointer rounded-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isPending || !privacyChecked}
                onClick={(e) => {
                  if (!privacyChecked) {
                    e.preventDefault();
                    setSubscribeError(
                      "Por favor, acepta la política de privacidad para continuar.",
                    );
                  }
                }}
                aria-describedby="privacy-error"
              >
                {isPending ? "Enviando..." : "SUSCRIBIR"}
              </button>
              {!privacyChecked && (
                <p
                  id="privacy-error"
                  className="text-bes-red mt-2 text-center text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  Please accept the privacy policy to continue
                </p>
              )}
            </div>
          </div>
        </form>
        <div className="mt-1 flex min-h-[40px] items-center justify-center md:mt-2 md:min-h-[50px]">
          {subscribeSuccess && (
            <p className="bg-bes-purple/10 text-bes-purple rounded-lg px-3 py-1 text-sm font-bold md:px-4 md:py-2 md:text-base">
              {subscribeSuccess}
            </p>
          )}
          {subscribeError && (
            <p className="bg-bes-red/10 text-bes-red rounded-lg px-3 py-1 text-sm font-bold md:px-4 md:py-2 md:text-base">
              {subscribeError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

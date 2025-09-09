import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <div className="bg-bes-amber flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-bes-red mb-4 text-4xl font-bold">404</h1>
        <p className="text-bes-red text-lg">
          {t
            ? t("pageNotFound")
            : "Seite nicht gefunden / Página no encontrada"}
        </p>
      </div>
    </div>
  );
}

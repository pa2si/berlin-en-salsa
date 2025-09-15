import { routing } from "./src/i18n/routing";
import messages from "./messages/de.json";

declare module "next-intl" {
  interface AppConfig {
    // Enable type safety for locales
    Locale: (typeof routing.locales)[number];
    // Enable type safety for message keys based on German messages as source of truth
    Messages: typeof messages;
  }
}

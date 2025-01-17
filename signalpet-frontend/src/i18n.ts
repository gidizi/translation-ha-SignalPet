import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

//note: it worth try to find some method to sync between i18n supportedlngs lists and the libre configuration
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    supportedLngs: ["en", "es", "de", "pt", "fr"],
    fallbackLng: "en",
    backend: {
      loadPath: "/locales/i18n/{{lng}}/{{ns}}.json",
    },
  });

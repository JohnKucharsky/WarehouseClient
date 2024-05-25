import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./translations/en.ts";
import { ru } from "./translations/ru.ts";

const resources = {
  enUS: {
    translation: en,
  },
  ruRU: {
    translation: ru,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ruRU",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

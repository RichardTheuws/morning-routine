import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from './locales/en/common.json';
import enExercises from './locales/en/exercises.json';
import enOnboarding from './locales/en/onboarding.json';
import nlCommon from './locales/nl/common.json';
import nlExercises from './locales/nl/exercises.json';
import nlOnboarding from './locales/nl/onboarding.json';

const resources = {
  en: {
    common: enCommon,
    exercises: enExercises,
    onboarding: enOnboarding,
  },
  nl: {
    common: nlCommon,
    exercises: nlExercises,
    onboarding: nlOnboarding,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'morning-routine-language',
    },
  });

export default i18n;
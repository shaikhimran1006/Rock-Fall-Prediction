/**
 * Internationalization (i18n) Configuration
 * Multi-language support for the Rockfall Prediction System
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import mrTranslations from './locales/mr.json';
import taTranslations from './locales/ta.json';
import teTranslations from './locales/te.json';
import bnTranslations from './locales/bn.json';
import guTranslations from './locales/gu.json';

const resources = {
    en: {
        translation: enTranslations
    },
    hi: {
        translation: hiTranslations
    },
    mr: {
        translation: mrTranslations
    },
    ta: {
        translation: taTranslations
    },
    te: {
        translation: teTranslations
    },
    bn: {
        translation: bnTranslations
    },
    gu: {
        translation: guTranslations
    }
};

// Language configurations
export const languages = [
    {
        code: 'en',
        name: 'English',
        nativeName: 'English',
        flag: '🇺🇸',
        dir: 'ltr'
    },
    {
        code: 'hi',
        name: 'Hindi',
        nativeName: 'हिंदी',
        flag: '🇮🇳',
        dir: 'ltr'
    },
    {
        code: 'mr',
        name: 'Marathi',
        nativeName: 'मराठी',
        flag: '🇮🇳',
        dir: 'ltr'
    },
    {
        code: 'ta',
        name: 'Tamil',
        nativeName: 'தமிழ்',
        flag: '🇮🇳',
        dir: 'ltr'
    },
    {
        code: 'te',
        name: 'Telugu',
        nativeName: 'తెలుగు',
        flag: '🇮🇳',
        dir: 'ltr'
    },
    {
        code: 'bn',
        name: 'Bengali',
        nativeName: 'বাংলা',
        flag: '🇮🇳',
        dir: 'ltr'
    },
    {
        code: 'gu',
        name: 'Gujarati',
        nativeName: 'ગુજરાતી',
        flag: '🇮🇳',
        dir: 'ltr'
    }
];

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next
    .use(initReactI18next)
    // initialize i18next
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,

        // Language detection options
        detection: {
            order: ['localStorage', 'browserLanguage', 'htmlTag'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        // React i18next options
        react: {
            useSuspense: false,
            bindI18n: 'languageChanged loaded',
            bindI18nStore: 'added removed',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
        },
    });

export default i18n;
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { mergeLanguage } from 'shared/translations';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // we init with resources
    resources: mergeLanguage({ en: {}, vi: {} }),
    fallbackLng: 'vi',
    debug: false,

    // have a common namespace used around the full app
    ns: ['app'],
    defaultNS: 'app',

    // keySeparator: ".",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

import dayjs from 'dayjs';
import vi from 'dayjs/locale/vi';
import en from 'dayjs/locale/en-gb';
const locales = { vi, en };
console.log('locales: ', locales);
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { getCurrentLanguage, setCurrentLanguage } from 'shared/services';
import enGlobal from './en';
import viGlobal from './vi';
import { merge } from 'lodash';
import { Radio } from 'antd';
export const mergeLanguage = ({ en, vi }) => {
  return {
    en: merge(enGlobal, en),
    vi: merge(viGlobal, vi),
  };
};

export const LanguageContext = createContext({
  language: 'vi',
  toogle: () => {},
});

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const currentLanguage = getCurrentLanguage();
  const { i18n } = useTranslation();
  console.log('useTranslation(): ', useTranslation());
  const [language, setLanguage] = useState(currentLanguage || 'vi');

  useEffect(() => {
    if (language && i18n.changeLanguage) {
      console.log('i18n: ', i18n);
      i18n.changeLanguage(language);
      dayjs.locale(locales[language]);
    }
  }, [language, i18n]);

  const toggle = useCallback(() => {
    const next = language === 'vi' ? 'en' : 'vi';
    setCurrentLanguage(next);
    setTimeout(() => {
      window.location.reload();
    }, 300);
    // setLanguage((lng) => {
    //   return next;
    // });
  }, [language]);

  const values = useMemo(
    () => ({
      language,
      toggle,
    }),
    [language, toggle],
  );
  return (
    <LanguageContext.Provider value={values}>
      {children}
    </LanguageContext.Provider>
  );
};

export const LocaleToggle = () => {
  const { language, toggle } = useContext(LanguageContext);
  return (
    <Radio.Group value={language} onChange={toggle} size="small">
      {['en', 'vi'].map((item) => (
        <Radio.Button value={item} key={item}>
          {item.toUpperCase()}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

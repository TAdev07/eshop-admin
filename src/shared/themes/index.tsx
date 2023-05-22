import { ConfigProvider, Switch, theme as antTheme } from 'antd';
import React, { useMemo, useState } from 'react';
import { getTheme, setTheme as saveTheme } from 'shared/services';
import { ThemeProvider } from 'styled-components';
import { dark } from './dark';
import { light } from './light';
const { useToken } = antTheme;

import en from 'antd/locale/en_GB';
import vi from 'antd/locale/vi_VN';
import { useLanguage } from 'shared/translations';
import { DarkProvider, LightProvider } from './antd';
const locales = { vi, en };
export const ThemeContext = React.createContext({
  theme: 'light',
  toggle: () => {},
  fixed: false,
});

export const useTheme = () => {
  return React.useContext(ThemeContext);
};
const MergeThemeProvider = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);
  const { token } = useToken();
  const mergeToken = useMemo(() => {
    const currentThemeToken = theme === 'light' ? light : dark;
    const mergeToken = {
      ...token,
      ...currentThemeToken,
    };
    return mergeToken;
  }, [theme]);
  return <ThemeProvider theme={mergeToken}>{children}</ThemeProvider>;
};

const OuterConfigProvider = ({ children }: { children: React.FC }) => {
  const { language } = useLanguage();
  const { theme } = React.useContext(ThemeContext);

  const Provider = useMemo(() => {
    return theme === 'light' ? LightProvider : DarkProvider;
  }, [theme]);
  return (
    <Provider locale={locales[language]}>
      <MergeThemeProvider>{children}</MergeThemeProvider>
    </Provider>
  );
};
export const StyledThemeProvider = ({
  children,
  theme: fixedTheme,
}: {
  children: any;
  theme?: string;
}) => {
  const currentTheme = fixedTheme || getTheme();
  const [theme, setTheme] = React.useState(currentTheme || 'light');

  const values = useMemo(
    () => ({
      theme,
      toggle: () => {
        if (fixedTheme) return;
        setTheme((theme) => {
          const name = theme === 'light' ? 'dark' : 'light';
          saveTheme(name);
          return name;
        });
      },
      fixed: !!fixedTheme,
    }),
    [theme, fixedTheme],
  );

  return (
    <ThemeContext.Provider value={values}>
      <OuterConfigProvider>{children}</OuterConfigProvider>
    </ThemeContext.Provider>
  );
};

export const ThemeToggle = () => {
  const { theme, toggle } = React.useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === 'light');
  const onToggle = () => {
    setChecked((prev) => !prev);
    setTimeout(() => toggle(), 300);
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            lineHeight: 1.65,
            fontSize: 18,
            fontSizeSM: 18,
          },
        },
      }}
    >
      <Switch
        checked={checked}
        checkedChildren={'🌞'}
        unCheckedChildren={'🌙'}
        onChange={onToggle}
      />
    </ConfigProvider>
  );
};

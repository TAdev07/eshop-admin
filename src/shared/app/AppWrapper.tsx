import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from 'shared/translations';
import { StyledThemeProvider } from 'shared/themes';

type AppWrapperProps = {
  store: any;
  children: any;
};

export default function AppWrapper({ store, children }: AppWrapperProps) {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <StyledThemeProvider>
          <Provider store={store}>{children}</Provider>
        </StyledThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

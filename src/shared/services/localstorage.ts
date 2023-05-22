const { REACT_APP_NAME } = import.meta.env;
const LocalStorageKey = {
  ACCESS_TOKEN: `${REACT_APP_NAME}_access_token`,
  REFRESH_TOKEN: `${REACT_APP_NAME}_refresh_token`,
  // USER_INFO: `${REACT_APP_NAME}_user_info`,
  LAST_LOGIN_TYPE: `${REACT_APP_NAME}_last_login_type`,
  THEME: `${REACT_APP_NAME}_theme`,
  LOCALE: `${REACT_APP_NAME}_locale`,
  SHOW_INTRO: `${REACT_APP_NAME}_show_intro`,
};

const getAccessToken = () => {
  return localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
};

const getRefreshToken = () => {
  return localStorage.getItem(LocalStorageKey.REFRESH_TOKEN);
};

const getLastLoginType = () => {
  return localStorage.getItem(LocalStorageKey.LAST_LOGIN_TYPE) || 'LDAP';
};

const setLastLoginType = (type) => {
  localStorage.setItem(LocalStorageKey.LAST_LOGIN_TYPE, type);
};
// const setUserInfo = (userInfo) => {
//   localStorage.setItem(LocalStorageKey.USER_INFO, JSON.stringify(userInfo));
// };

const setToken = ({ access_token, refresh_token } = {}) => {
  localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, access_token);
  if (refresh_token) {
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refresh_token);
  }
};

const getCurrentLanguage = () => {
  return localStorage.getItem(LocalStorageKey.LOCALE) || 'vi';
};

const setCurrentLanguage = (lng) => {
  localStorage.setItem(LocalStorageKey.LOCALE, lng);
};

// const getUserInfo = () => {
//   let u = localStorage.getItem(LocalStorageKey.USER_INFO) || '{}';
//   return JSON.parse(u);
// };

const clearData = () => {
  localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
  // localStorage.removeItem(LocalStorageKey.USER_INFO);
};

const clearAcessToken = () => {
  const refresh_token = getRefreshToken();
  if (refresh_token) {
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
  }
};

const getTheme = () => {
  return localStorage.getItem(LocalStorageKey.THEME);
};
const setTheme = (theme) => {
  localStorage.setItem(LocalStorageKey.THEME, theme);
};

export {
  LocalStorageKey,
  setToken,
  getAccessToken,
  getRefreshToken,
  clearData,
  getCurrentLanguage,
  setCurrentLanguage,
  // getUserInfo,
  // setUserInfo,
  getTheme,
  setTheme,
  clearAcessToken,
  getLastLoginType,
  setLastLoginType,
};

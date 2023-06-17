import { Spin } from 'antd';
import { uniq } from 'lodash';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ReactComponent as LoadingIcon } from './loading.svg';
import './style.css';
const indicator = <LoadingIcon className= 'icon-vinhomes' style={{ width: 160, height: 160 }} />;
export const LoadingContext = createContext({
  loadingKeys: [],
  setLoading: () => {},
});
export const useLoading = () => useContext(LoadingContext);
export const LoadingProvider = ({ children }) => {
  const [loadingKeys, setLoadingKeys] = useState([]);

  const setLoading = useCallback(
    (key, state) => {
      if (!key) return;
      if (state) {
        setLoadingKeys((prev) => uniq([...prev, key]));
      } else setLoadingKeys((prev) => prev.filter((k) => k !== key));
    },
    [setLoadingKeys],
  );

  const values = useMemo(
    () => ({
      loadingKeys,
      setLoading,
    }),
    [loadingKeys, setLoading],
  );
  return (
    <LoadingContext.Provider value={values}>
      <Spin
        spinning={loadingKeys.length > 0}
        delay={2000}
        wrapperClassName="loadingWrapper"
        indicator={indicator}
      >
        {children}
      </Spin>
    </LoadingContext.Provider>
  );
};

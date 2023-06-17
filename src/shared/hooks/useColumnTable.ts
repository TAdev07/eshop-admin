import { useLocalStorageState } from 'ahooks';
import { useCallback, useMemo } from 'react';
import { LocalStorageKey } from 'shared/services';

export function useColumnTable(key, { columns, keyExpr = 'dataIndex' }) {
  const [config, setConfig] = useLocalStorageState(
    `${LocalStorageKey.COLUMNS_CONFIG}_${key}`,
    {
      defaultValue: null,
    },
  );
  let setNewConfig = useCallback((newVal) => {
    setConfig(newVal);
    return newVal.reduce((total, cur) => {
      const found = columns.find((d) => d[keyExpr] === cur.key);
      if (found) return [...total, found];
      else return total;
    }, []);
  });
  const value = useMemo(() => {
    if (config) return setNewConfig(config);
    else return columns;
  }, [setConfig, config]);
  return [value, setNewConfig];
}

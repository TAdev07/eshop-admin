import React from 'react';
import { useSearchParams } from 'react-router-dom';
import * as JSURL from 'jsurl';

export function useQueryParam(key, defaultParams = {}) {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = React.useMemo(
    () => ({ ...defaultParams, ...JSURL.parse(paramValue) }),
    [paramValue, defaultParams],
  );

  let setValue = React.useCallback(
    (newValue, options) => {
      if (!newValue) {
        searchParams.delete(key);
        setSearchParams(searchParams);
      } else {
        let newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(key, JSURL.stringify(newValue));
        setSearchParams(newSearchParams, options);
      }
    },
    [key, searchParams, setSearchParams],
  );

  return [value, setValue];
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getValueFromQuery(query, key, defaultValue) {
  if (!query.has(key)) return defaultValue;

  const v = query.get(key);
  if (typeof defaultValue === 'object') {
    try {
      return JSON.parse(decodeURIComponent(v));
    } catch {
      return defaultValue;
    }
  }

  if (typeof defaultValue === 'string') {
    return decodeURIComponent(v);
  }

  if (typeof defaultValue === 'number') return +v;

  return v;
}

export default function useQueryState(query, key, defaultValue) {
  const history = useNavigate();
  const [param, setParam] = useState(
    getValueFromQuery(query, key, defaultValue),
  );

  useEffect(() => {
    query.set(
      key,
      typeof param === 'object'
        ? encodeURIComponent(JSON.stringify(param))
        : typeof param === 'string'
        ? encodeURIComponent(param.trim())
        : encodeURIComponent(param),
    );
    history({ search: query.toString() });
  }, [param, query]);

  return [param, setParam];
}

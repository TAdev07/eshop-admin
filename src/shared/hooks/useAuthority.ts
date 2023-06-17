import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { checkAuthority } from 'shared/utils';

export function useAuthority(props) {
  const { authorities, root } = useSelector((state) => state.auth);
  const data = useMemo(() => {
    return checkAuthority(props)(authorities, root);
  }, [props, authorities, root]);
  return data;
}

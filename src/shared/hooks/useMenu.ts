import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import { arrayToTreeHash } from 'shared/utils';

export function useMenu(menuData) {
  const { root, menu } = useSelector((state) => state.auth);
  return useMemo(() => {
    if (root) {
      return menuData;
    }
    let hash = arrayToTreeHash(menuData, 'key', 'parentId');
    let filterMenu = menuData.filter((item) => {
      const { root = false, code } = item;
      return !root && (item.public || menu.includes(code));
    });
    filterMenu.forEach((item) => {
      if (item?.parentId && hash[item?.parentId]) {
        filterMenu.push(hash[item?.parentId]);
      }
    });
    return filterMenu;
  }, [menuData, root, menu]);
}

export function useSelectedMenu({ baseURL = '', menuList = [] }) {
  const location = useLocation();
  return useMemo(() => {
    if (menuList.length > 0) {
      const pathname = location.pathname.replace(baseURL, '') || '/';
      let selectedItem = '403';

      if (pathname === '/') {
        const found = menuList.find((item) =>
          matchPath(
            { path: item.url.replace(baseURL, ''), end: false },
            pathname,
          ),
        );
        if (found) selectedItem = found;
      } else {
        const found = menuList.find((item) => {
          const url = item.url.replace(baseURL, '');
          return (
            url !== '/' &&
            matchPath(
              { path: item.url.replace(baseURL, ''), end: false },
              pathname,
            )
          );
        });
        if (found) selectedItem = found;
      }
      return selectedItem;
    }
    return null;
  }, [location, menuList, baseURL]);
}

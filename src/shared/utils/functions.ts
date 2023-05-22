export const arrayToTreeHash = (
  arr,
  keyExpr = 'id',
  parentExpr = 'parantId',
  transformFn = (item) => item,
) => {
  return arr.reduce((total, cur) => {
    const key = cur[keyExpr];
    const children = arr.filter((item) => item[parentExpr] === key);
    const values = transformFn(cur);
    return {
      ...total,
      [key]: { ...values, children: children.map((item) => item[keyExpr]) },
    };
  }, {});
};

export const getShortName = (name) => {
  const split = name.split(' ');
  if (split.length > 1) {
    let s = split[0][0] + (split.at(-1).at(0) || '');
    return s.toUpperCase();
  }
  return name?.[0]?.toUpperCase()|| '';
};

export const checkAuthority =
  ({ scope = ['list', 'get', 'create', 'update', 'delete'], resourceCode }) =>
  (listAuthority = {}, isRoot = false) => {
    // console.log({ isRoot, listAuthority });
    if (isRoot) {
      if (Array.isArray(scope)) {
        return scope.reduce((total, cur) => ({ ...total, [cur]: true }), {});
      }
      return true;
    }
    if (
      !resourceCode ||
      !listAuthority ||
      Object.keys(listAuthority).length <= 0
    ) {
      if (Array.isArray(scope)) {
        return scope.reduce((total, cur) => ({ ...total, [cur]: false }), {});
      }
      return false;
    }
    if (Array.isArray(scope)) {
      return scope.reduce(
        (total, cur) => ({
          ...total,
          [cur]:
            (listAuthority[resourceCode] && listAuthority[resourceCode][cur]) ||
            false,
        }),
        {},
      );
    }
    return (
      (listAuthority[resourceCode] && listAuthority[resourceCode][scope]) ||
      false
    );
  };

export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string?.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (nameValue = 'Anonymous', rest = {}) => {
  const backgroundColor = stringToColor(nameValue);
  const defaultSx = {
    backgroundColor,
    // color: (theme) => theme.palette.getContrastText(backgroundColor),
  };
  return {
    style: { ...defaultSx, ...rest },
    children: getShortName(nameValue),
  };
};

export function getArrayValue(item) {
  if (item === undefined || item === null) {
    return [];
  }
  if (Array.isArray(item)) return item;
  else return [item];
}
export function getScrollItemsHeight(insideTab) {
  let h = 0;
  let items = document.getElementsByClassName('scroll-caculate-item');
  let tabItems = document.getElementsByClassName('ant-tabs-nav');
  for (let i = 0; i < items.length; i++) {
    h += items[i].clientHeight;
  }
  if (insideTab && tabItems?.length)
    for (let i = 0; i < tabItems.length; i++) {
      let tabH = tabItems[i].clientHeight + 16;
      h += tabH;
    }
  return h;
}
export function getScrollFormItemsHeight() {
  let h = 0;
  let items = document.getElementsByClassName('scroll-form-caculate-item');
  for (let i = 0; i < items.length; i++) {
    h += items[i].clientHeight;
  }
  return h + 'px';
}

export const trimAll = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === 'string') obj[k] = obj[k].trim();
  });
  return obj;
};
export const removeNullAll = (obj) => {
  const p= {...obj}
  Object.keys(obj).forEach((k) => {
    if ( !obj[k]) delete p[k]
  });
  return p;
};

export const listToTree = (
  arr = [],
  options = { parentId: 'parentId', id: 'id' },
) => {
  let map = {},
    node,
    res = [],
    i;
  for (i = 0; i < arr.length; i += 1) {
    map[arr[i][options.id]] = i;
    arr[i].children = [];
  }
  for (i = 0; i < arr.length; i += 1) {
    node = arr[i];
    const parent = node[options.parentId];
    if (parent) {
      if (!arr[map[parent]]?.children) {
        res.push(node);
      } else {
        arr[map[parent]]?.children?.push(node);
      }
    } else {
      res.push(node);
    }
  }
  return res;
};

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
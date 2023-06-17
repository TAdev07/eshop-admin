import React from 'react';
import { Menu as AMenu } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenNavKeys } from 'shared/reduxGlobal/slices/nav';

export function Menu({
  itemLink = 'url',
  keyExpr = 'key',
  parentExpr = 'parentId',
  displayExpr = 'name',
}) {
  const dispatch = useDispatch();
  const { data, selectedKeys, openKeys } = useSelector((state) => state.nav);
  const renderItem = (item, level = 1) => {
    const key = item[keyExpr];
    const hasChild = item?.children && item?.children.length > 0;
    // const selected = selectedKeys.includes(key);
    let linkProps = {
      children: item[displayExpr],
    };
    if (itemLink && !hasChild) {
      const href =
        typeof itemLink == 'function' ? itemLink(item) : item[itemLink] || '#';
      linkProps.to = href;
    }
    return hasChild ? (
      <AMenu.SubMenu title={item[displayExpr]} key={key}>
        {(item?.children || []).map((k) => {
          const child = data[k];
          if (!child) return null;
          return renderItem(child, level + 1);
        })}
      </AMenu.SubMenu>
    ) : (
      <AMenu.Item key={key} style={{ margin: 4 }}>
        <Link {...linkProps} />
      </AMenu.Item>
    );
  };
  const onOpenChange = (keys) => {
    dispatch(setOpenNavKeys(keys));
  };
  return (
    <AMenu
      // theme="dark"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      multiple
      onOpenChange={onOpenChange}
      style={{
        borderInlineEnd: 'none',
      }}
    >
      {data &&
        Object.values(data)
          .filter((item) => {
            const parentKey = item[parentExpr];
            return !parentKey || (parentKey && !data[parentKey]);
          })
          .map((item) => renderItem(item))}
    </AMenu>
  );
}

import { Tree } from 'antd';
import { useEffect, useState } from 'react';
import { arrayToTreeHash } from 'shared/utils';
const { TreeNode } = Tree;
export const TreeView = ({
  treeData,
  keyExpr = 'id',
  parentExpr = 'parentId',
  displayExpr = 'name',
  ...rest
}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const transformTreeNode = (item) => {
      const clone = structuredClone(item);
      delete clone[keyExpr];
      delete clone[displayExpr];
      clone.key = item[keyExpr];
      clone.title = item[displayExpr];
      return clone;
    };
    if (Array.isArray(treeData)) {
      setData(
        arrayToTreeHash(treeData, keyExpr, parentExpr, transformTreeNode),
      );
    } else if (typeof treeData == 'object') {
      setData(treeData);
    }
  }, [treeData, setData, keyExpr, parentExpr, displayExpr]);
  const defaultProps = {
    icon: false,
    blockNode: true,
  };
  const mergeProps = { ...defaultProps, ...rest };
  const renderItem = ({ children, ...rest }) => (
    <TreeNode {...rest}>
      {children &&
        children.map((k) => {
          const child = data[k];
          return child && renderItem(child);
        })}
    </TreeNode>
  );
  return (
    <Tree {...mergeProps}>
      {Object.values(data)
        .filter((item) => {
          const parentKey = item[parentExpr];
          return !parentKey || (parentKey && !data[parentKey]);
        })
        .map((item) => renderItem(item))}
    </Tree>
  );
};

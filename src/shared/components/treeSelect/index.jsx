/* eslint-disable */
import { TreeSelect as TreeSelectAnt } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { listToTree } from 'shared/utils';

export const TreeSelect = ({
  loadData,
  keyExpr = 'id',
  displayExpr = 'name',
  parentExpr = 'parentId',
  onFocus,
  onBlur,
  ...rest
}) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDataGroupUser = () => {
      setLoading(true);
      loadData()
        .then((res) => {
          const vals = res?.data.map((o) => ({
            ...o,
            title: o[displayExpr],
            value: o[keyExpr],
          }));
          setData(listToTree([...vals]));
        })
        .finally(() => setLoading(false));
    };
    open && fetchDataGroupUser();
  }, [open]);

  const defaultProps = {
    allowClear: true,
    showSearch: true,
    showArrow: true,
  };
  const mergeProps = {
    ...defaultProps,
    ...rest,
  };

  return (
    <TreeSelectAnt
      onFocus={() => {
        setOpen(true);
        onFocus && onFocus();
      }}
      onBlur={() => {
        setOpen(false);
        onBlur && onBlur();
      }}
      filterTreeNode={(search, item) => {
        return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
      }}
      optionFilterProp="title"
      filterOption={false}
      style={{ width: '100%' }}
      loading={loading}
      //   dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      // treeDefaultExpandAll
      treeData={data}
      {...mergeProps}
    />
  );
};

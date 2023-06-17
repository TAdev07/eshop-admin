import { Pagination as APagination, Button, Drawer, List } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollArea, VCenter } from '../common';
import { DeleteOutlined } from '@ant-design/icons';
import { get } from 'lodash';

// selection={{
//   selectedRows,
//   onChange: setSelectedRows,
//   key: 'id',
//   title: 'details.issueName',
//   desciption: (item) =>
//     dayjs(item.createdDate).format('DD/MM/YYYY HH:mm'),
// }}
export const Pagination = ({ className = '', selection, ...rest }) => {
  const { t } = useTranslation();
  const [openSelection, setOpenSelection] = useState(false);
  const showTotal = (total, range) =>
    t('data.infoText', { 0: range[0], 1: range[1], 2: total });
  const defaultProps = {
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: [20, 50, 100],
    showTotal,
    responsive: true,
    showLessItems: true,
    // hideOnSinglePage: true,
  };
  const mergeProps = { ...defaultProps, ...rest };
  const onClearSelection = () => {
    if (selection?.onChange) {
      selection?.onChange([]);
    }
  };
  const onDeleteItem = (item) => {
    if (selection?.onChange) {
      const newSelectedRows = selection?.selectedRows.filter(
        (d) => get(d, selection?.key) !== get(item, selection?.key),
      );
      selection?.onChange(newSelectedRows);
    }
  };
  const renderSelectedItem = (item) => {
    const title =
      typeof selection?.title == 'function'
        ? selection?.title(item)
        : get(item, selection?.title || 'name', '');
    const desciption =
      typeof selection?.desciption == 'function'
        ? selection?.desciption(item)
        : get(item, selection?.desciption || 'desciption', null);
    return (
      <List.Item
        actions={[
          <Button
            icon={<DeleteOutlined />}
            type="text"
            onClick={() => onDeleteItem(item)}
          />,
        ]}
      >
        <List.Item.Meta title={title} description={desciption} />
      </List.Item>
    );
  };
  return (
    <VCenter
      style={{ padding: '8px 0', justifyContent: 'space-between' }}
      className={className}
    >
      <div>
        {selection?.selectedRows?.length > 0 && (
          <>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              onClick={onClearSelection}
              title="Bỏ chọn"
            />
            <Button
              type="text"
              onClick={() => {
                if (selection?.onClick) {
                  selection?.onClick();
                } else setOpenSelection(true);
              }}
            >
              <span
                css={`
                  color: ${(props) => props.theme.colorPrimary};
                  text-decoration: underline;
                `}
              >
                {`${selection?.selectedRows?.length} đã chọn`}{' '}
              </span>
            </Button>
            <Drawer
              css={`
                .ant-drawer-header .ant-drawer-header-title {
                  flex-direction: row-reverse;
                }
              `}
              open={openSelection}
              onClose={() => setOpenSelection(false)}
              title={`${selection?.selectedRows?.length} đã chọn`}
            >
              <ScrollArea style={{ height: '100%' }}>
                <List
                  dataSource={selection?.selectedRows}
                  renderItem={renderSelectedItem}
                ></List>
              </ScrollArea>
            </Drawer>
          </>
        )}
      </div>
      <APagination {...mergeProps} />
    </VCenter>
  );
};

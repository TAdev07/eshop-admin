import { Button, Drawer, DrawerProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import SortableItem from './SortableItem';
type CustomProps = DrawerProps & {
  columnTable: any;
  screenType: any;
  onOk: any;
  description?: any;
  keyExpr?: string;
};
export const CustomColumns = ({
  open,
  title = 'Tùy chỉnh',
  columnTable = [],
  screenType,
  keyExpr = 'dataIndex',
  description,
  onOk,
  ...rest
}: CustomProps) => {
  const { t } = useTranslation();
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(columnTable);
  }, [columnTable, open]);

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i[keyExpr] === active.id);
        const overIndex = previous.findIndex((i) => i[keyExpr] === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };
  const fixedColumns = [...dataSource.filter((item) => item.type === 'fixed')];
  const cols = [...dataSource.filter((item) => item.type !== 'fixed')];

  return (
    <Drawer
      {...rest}
      title={title}
      closable={false}
      open={open}
      extra={
        <Button
          onClick={() => rest.onClose(null)}
          type="text"
          icon={<CloseOutlined />}
        ></Button>
      }
      footer={
        <div style={{ justifyContent: 'flex-end', display: 'flex', gap: 10 }}>
          <Button
            onClick={() => {
              rest.onClose(null);
            }}
          >
            {t('action.cancel')}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              rest.onClose(null);
              const newData = dataSource?.map((o) => ({
                key: o[keyExpr],
                type: o?.type,
              }));
              onOk(newData);
            }}
          >
            {t('action.OK')}
          </Button>
        </div>
      }
    >
      <div>
        <div style={{ marginTop: 8, marginBottom: 16 }}>
          {description ||
            'Điều chỉnh thứ tự hiển thị của các cột thông tin trong màn danh sách'}
        </div>
        <div>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Hiển thị</div>
          <DndContext
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={dataSource.map((i) => i[keyExpr])}
              strategy={verticalListSortingStrategy}
            >
              {fixedColumns?.map((item) => (
                <SortableItem
                  sortable={false}
                  key={item[keyExpr]}
                  item={item}
                  id={item[keyExpr]}
                />
              ))}
              {cols.map((item) => (
                <SortableItem
                  key={item[keyExpr]}
                  item={item}
                  id={item[keyExpr]}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </Drawer>
  );
};

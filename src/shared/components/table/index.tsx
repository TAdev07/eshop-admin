/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useWindowSize } from 'react-use';
import { findIndex, get } from 'lodash';

// component
import { Table as AntdTable, Button, Checkbox, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { getScrollItemsHeight } from 'shared/utils/functions';
import { Box } from '../box';

const CustomGridData = styled(AntdTable)`
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  tbody tr td {
    vertical-align: middle !important;
  }
  tbody tr td:first-child:not(.ant-table-selection-column) {
    padding-left: 20px !important;
  }
  thead tr th:first-child:not(.ant-table-selection-column) {
    padding-left: 20px !important;
  }
  tbody tr td:first-child.ant-table-selection-column {
    padding-left: 12px !important;
  }
  thead tr th:first-child.ant-table-selection-column {
    padding-left: 12px !important;
  }
  && .ant-table-body {
    overflow-y: overlay !important;
    ::-webkit-scrollbar,
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background: transparent;
    }
    :hover::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.colorPrimaryBgHover};
      border-radius: 100px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #888;
    }
  }
  &&.ant-table-wrapper .ant-table-pagination.ant-pagination {
    margin: 0;
    padding: 8px 0;
  }
  &&,
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table,
  .ant-table-container,
  .ant-table-header {
    border-top-left-radius: ${(props) => props.theme.borderRadius}px;
    border-top-right-radius: ${(props) => props.theme.borderRadius}px;
  }
  && .ant-table-header > table {
    border-top-left-radius: ${(props) => props.theme.borderRadius}px;
    border-top-right-radius: ${(props) => props.theme.borderRadius}px;
    > thead {
      border-top-left-radius: ${(props) => props.theme.borderRadius}px;
      border-top-right-radius: ${(props) => props.theme.borderRadius}px;
      > tr {
        border-top-left-radius: ${(props) => props.theme.borderRadius}px;
        border-top-right-radius: ${(props) => props.theme.borderRadius}px;
        th:first-child {
          border-top-left-radius: ${(props) => props.theme.borderRadius}px;
        }
        th:last-child {
          border-top-right-radius: ${(props) => props.theme.borderRadius}px;
        }
      }
    }
  }
`;

/**
 *
 * @param {height} height : if pass height value as 'fix-scroll',
 *  the height of table is calculate base on document height minus height of scroll items like header, footer
 *  to make table sticky header and not make body overflow scroll
 * @returns
 */

const dataTypeRender = ({
  render,
  dataType = 'string',
  format,
  dataIndex,
  buttons,
  to,
}) => {
  if (render) return render;
  else {
    switch (dataType) {
      case 'link':
        return (text: any, record: any) => {
          return (
            <Link
              to={to(record)}
              css={`
                color: ${(props: { theme: { colorPrimary: any } }) =>
                  props.theme.colorPrimary};
              `}
            >
              {text}
            </Link>
          );
        };
      case 'date':
        return (_: any, record: any) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || 'DD/MM/YYYY');
        };
      case 'datetime':
        return (_: any, record: any) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || 'HH:mm DD/MM/YYYY');
        };
      case 'time':
        return (_: any, record: any) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || 'HH:mm');
        };
      case 'number':
        return (_: any, record: any) => {
          const value = get(record, dataIndex);
          return value && new Intl.NumberFormat('vi-VN', format).format(value);
        };
      case 'boolean':
        return (_: any, record: any) => {
          const value = get(record, dataIndex);
          return <Checkbox checked={value} />;
        };
      case 'object':
        return (_: any, record: any) => {
          const value = get(record, dataIndex);
          return value && JSON.stringify(value);
        };
      case 'buttons':
        return (text: any, record: { id: any }, index: any) => (
          <Box>
            {React.Children.toArray(
              buttons.map(
                ({
                  onClick,
                  title = '',
                  loadingId,
                  disabled = false,
                  visible = () => true,
                  ...rest
                }) =>
                  visible({ text, record, index }) && (
                    <Tooltip title={title}>
                      <Button
                        {...rest}
                        loading={loadingId === record.id}
                        type="text"
                        shape="circle"
                        onClick={(event) =>
                          onClick && onClick({ event, text, record, index })
                        }
                        disabled={disabled && disabled({ text, record, index })}
                      />
                    </Tooltip>
                  ),
              ),
            )}
          </Box>
        );
      case 'string':
      default:
        return null;
    }
  }
};
export function Table({
  insideTab = false,
  height = 'fix-scroll',
  columns,
  actions,
  pageIndex,
  pageSize,
  onChange,
  showIndexCol = true,
  offsetBottom = 16,
  customClassName = '',
  pagination = false,
  ...rest
}) {
  const { t } = useTranslation();
  const [paging, setPaging] = useState({ pageIndex, pageSize });
  const [tableHeight, setTableHeight] = useState(height);
  const tableRef = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    if (pageIndex && pageSize) setPaging({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);

  useEffect(() => {
    if (height === 'fix-scroll') {
      setTimeout(() => {
        let h = 0;
        const items2 = document.querySelectorAll(
          customClassName
            ? `.${customClassName} .ant-table-thead`
            : '.ant-table-thead',
        );
        for (let i = 0; i < items2.length; i++) {
          h += items2[i].clientHeight;
        }
        const subHeight =
          getScrollItemsHeight(insideTab) +
          offsetBottom +
          h +
          (pagination ? 52 : 0);
        setTableHeight(`calc(100vh - ${subHeight}px )`);
        // 20px là để bên dưới bảng ko bị sát màn hình quá
      }, 200);
    } else {
      setTimeout(() => {
        let h = 0;
        const items2 = document.querySelectorAll(
          customClassName
            ? `.${customClassName} .ant-table-thead`
            : '.ant-table-thead',
        );
        for (let i = 0; i < items2.length; i++) {
          h += items2[i].clientHeight;
        }
        setTableHeight(`calc(${height}px - ${offsetBottom}px - ${h}px )`);
        // 20px là để bên dưới bảng ko bị sát màn hình quá
      }, 200);
    }
  }, [size?.width, height]);
  const indexRender = useCallback(
    (item: any, record: any, index: number) => {
      return (
        ((paging?.pageIndex || 1) - 1) * (paging?.pageSize || 20) +
        index +
        1
      ).toLocaleString();
    },
    [paging],
  );
  const indexCol = {
    title: 'STT',
    width: '80px',
    sorter: false,
    align: 'left',
    fixed: 'left',
    render: indexRender,
  };
  const cols = useMemo(() => {
    let indexOption = findIndex(columns, { type: 'option' });
    if (indexOption < 0) indexOption = columns.length;
    let d = [
      ...columns?.filter(
        (i: { type: string }, index: number) =>
          i?.type !== 'option' && index < indexOption,
      ),
    ];
    if (showIndexCol) d = [indexCol, ...d];
    if (actions) d = [...d, actions];
    return d.map((props) => ({
      ...props,
      render: dataTypeRender(props),
    }));
  }, [columns, showIndexCol, indexRender, actions]);

  const showTotal = (total: any, range: any[]) =>
    t('data.infoText', { 0: range[0], 1: range[1], 2: total });

  const defaultPaging = {
    position: ['bottomRight'],
    size: 'default',
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: [20, 50, 100],
    showTotal,
    responsive: true,
  };
  const defaultProps = {
    width: '100%',
    columnWidth: 'auto',
    // bordered: true,
    size: 'small',
  };
  const mergeProps = { ...defaultProps, ...rest };

  const onTableChange = (
    pagination: { current: any; pageSize: any },
    filters: any,
    sorter: any,
    extra: { action: string },
  ) => {
    if (extra?.action == 'paginate') {
      setPaging({
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
    onChange && onChange({ pagination, filters, sorter, extra });
  };

  return (
    <CustomGridData
      ref={tableRef}
      onChange={onTableChange}
      columns={cols}
      scroll={{
        y: size?.height > 600 ? tableHeight || 'auto' : 'auto',
      }}
      {...mergeProps}
      pagination={pagination && { ...defaultPaging, ...pagination }}
    ></CustomGridData>
  );
}
Table.SELECTION_ALL = AntdTable.SELECTION_ALL;
Table.SELECTION_INVERT = AntdTable.SELECTION_INVERT;
Table.SELECTION_NONE = AntdTable.SELECTION_NONE;
Table.EXPAND_COLUMN = AntdTable.EXPAND_COLUMN;
Table.SELECTION_COLUMN = AntdTable.SELECTION_COLUMN;

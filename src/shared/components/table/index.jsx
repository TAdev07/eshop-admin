/* eslint-disable react-hooks/exhaustive-deps */
import { useSize } from 'ahooks';
import {
  Table as AntdTable,
  Button,
  Checkbox,
  Popover,
  Tag,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { findIndex, get, uniq, map } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getScrollItemsHeight } from 'shared/utils/functions';
import styled from 'styled-components';
import { Box } from '../box';

const convertAlignToJustify = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

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
export const Item = styled.div`
  // background-color: ${(props) => props.theme.colorBorderSecondary};
  border-radius: 10px;
  padding: 2px 8px;
  display: flex;
  justify-content: space-between;
  min-width: 180px;
  align-items: center;
`;
const LinkName = styled.div`
  // width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  height: 25px;
  -webkit-box-orient: vertical;
`;
const LinkNumber = styled.div`
  background: rgba(60, 60, 67, 0.1);
  border-radius: 18px;
  min-width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;
const RowNumber = styled.div`
  display: flex;
`;

/**
 *
 * @param {height} height : if pass height value as 'fix-scroll',
 *  the height of table is caulate base on document height minus height of scrol items like header, footer
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
  linkProps = {},
  popoverProps = { trigger: 'hover' },
  align,
  arrayProps = {},
}) => {
  if (render) return render;
  else {
    switch (dataType) {
      case 'array':
        var { displayExpr = 'name' } = arrayProps;
        return (_, record) => {
          const arr = get(record, dataIndex, []) || [];
          if (arr?.length <= 0) return null;
          else {
            let val = arr.map((d) => {
              const label =
                typeof displayExpr == 'function'
                  ? displayExpr(d)
                  : get(d, displayExpr);
              return label;
            });
            val = uniq(val);
            const first = val.shift();
            if (val?.length > 0) {
              const content = val.map((d, i) => <p key={i}>{d}</p>);
              return (
                <>
                  {first}{' '}
                  <Popover content={content} placement="bottom">
                    <Tag>+{val.length}</Tag>
                  </Popover>
                </>
              );
            } else return first;
          }
        };
      case 'link':
        return (text, record) => {
          return (
            <Link
              {...linkProps}
              to={
                (to && to(record)) || (linkProps?.to && linkProps?.to(record))
              }
              css={`
                color: ${(props) => props.theme.colorPrimary};
              `}
            >
              {text}
            </Link>
          );
        };
      case 'date':
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || 'DD/MM/YYYY');
        };
      case 'datetime':
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || 'HH:mm DD/MM/YYYY');
        };
      case 'time':
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && dayjs(value).format(format || 'HH:mm');
        };
      case 'number':
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && new Intl.NumberFormat('vi-VN', format).format(value);
        };
      case 'boolean':
        return (_, record) => {
          const value = get(record, dataIndex);
          return <Checkbox checked={value} />;
        };
      case 'object':
        return (_, record) => {
          const value = get(record, dataIndex);
          return value && JSON.stringify(value);
        };
      case 'buttons':
        return (text, record, index) => (
          <Box
            display="flex"
            items="center"
            justify={convertAlignToJustify[align]}
          >
            {React.Children.toArray(
              buttons.map(
                ({
                  onClick,
                  title = '',
                  loadingExpr,
                  disabled = false,
                  visible = () => true,
                  ...rest
                }) =>
                  visible({ text, record, index }) && (
                    <Tooltip title={title}>
                      <Button
                        {...rest}
                        loading={loadingExpr && loadingExpr(record)}
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
      case 'popovers':
        var {
          onItemClick,
          keyExpr = 'id',
          displayExpr = 'name',
          ...props
        } = popoverProps;
        return (text, record) => {
          const array = text || record[dataIndex] || [];
          if (array.length)
            return (
              <RowNumber>
                <LinkName>
                  {array.length && `${array[0][displayExpr]}`}
                </LinkName>
                <Popover
                  content={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                      }}
                    >
                      {map(array, (item) => (
                        <Item key={item[keyExpr]}>
                          <Link
                            to={item?.url}
                            onClick={() => onItemClick(item)}
                          >
                            {item[displayExpr]}
                          </Link>
                        </Item>
                      ))}
                    </div>
                  }
                  {...props}
                >
                  {popoverProps?.children || (
                    <>
                      {array?.length > 1 && (
                        <LinkNumber>{`+${array?.length - 1}`}</LinkNumber>
                      )}
                    </>
                  )}
                </Popover>
              </RowNumber>
            );
          return null;
        };
      case 'string':
      default:
        return null;
    }
  }
};

const getSortValue = ({ order, field }) => {
  switch (order) {
    case 'descend':
      return `-${field}`;
    case 'ascend':
      return `+${field}`;
    default:
      return undefined;
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
  const size = useSize(document.querySelector('body'));
  useEffect(() => {
    if (pageIndex && pageSize) setPaging({ pageIndex, pageSize });
  }, [pageIndex, pageSize]);
  useEffect(() => {
    if (height === 'fix-scroll') {
      setTimeout(() => {
        let h = 0;
        let items2 = document.querySelectorAll(
          customClassName
            ? `.${customClassName} .ant-table-thead`
            : '.ant-table-thead',
        );
        for (let i = 0; i < items2.length; i++) {
          h += items2[i].clientHeight;
        }
        let subHeight =
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
        let items2 = document.querySelectorAll(
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
    (item, record, index) => {
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
    render: indexRender,
  };
  const cols = useMemo(() => {
    let indexOption = findIndex(columns, { type: 'option' });
    if (indexOption < 0) indexOption = columns.length;
    let d = [
      ...columns?.filter(
        (i, index) => i?.type !== 'option' && index < indexOption,
      ),
    ];
    if (showIndexCol) d = [indexCol, ...d];
    if (actions) d = [...d, actions];
    return d.map((props) => ({
      ...props,
      render: dataTypeRender(props),
    }));
  }, [columns, showIndexCol, indexRender, actions]);

  const showTotal = (total, range) =>
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
  const onTableChange = (pagination, filters, sorter, extra) => {
    if (extra?.action == 'paginate') {
      setPaging({
        pageIndex: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
    let sort = getSortValue(sorter);
    onChange && onChange({ pagination, filters, sorter, extra, sort });
  };
  return (
    <CustomGridData
      ref={tableRef}
      onChange={onTableChange}
      columns={cols}
      scroll={{ y: size?.height > 600 ? tableHeight || 'auto' : 'auto' }}
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

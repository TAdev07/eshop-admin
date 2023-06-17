/* eslint-disable react-hooks/exhaustive-deps */
import { useSize } from 'ahooks';
import { Table as AntdTable } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getScrollItemsHeight } from 'shared/utils/functions';
// import { useTranslation } from "react-i18next";

const CustomGridData = styled(AntdTable)`
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  tbody tr td {
    vertical-align: middle !important;
  }
  tbody tr td:first-child {
    padding-left: 20px !important;
  }
  thead tr th:first-child {
    padding-left: 20px !important;
  }
  && {
    background-color: ${(props) => props.theme.colorBgContainer};
  }
  && .ant-table-body {
    overflow-y: auto !important;
  }
  &&,
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table,
  .ant-table-container,
  .ant-table-header {
    border-top-left-radius: ${(props) => props.theme.borderRadiusLG};
    border-top-right-radius: ${(props) => props.theme.borderRadiusLG};
  }
  && .ant-table-header > table {
    border-top-left-radius: ${(props) => props.theme.borderRadiusLG};
    border-top-right-radius: ${(props) => props.theme.borderRadiusLG};
    > thead {
      border-top-left-radius: ${(props) => props.theme.borderRadiusLG};
      border-top-right-radius: ${(props) => props.theme.borderRadiusLG};
      > tr {
        border-top-left-radius: ${(props) => props.theme.borderRadiusLG};
        border-top-right-radius: ${(props) => props.theme.borderRadiusLG};
        th:first-child {
          border-top-left-radius: ${(props) => props.theme.borderRadiusLG};
        }
        th:last-child {
          border-top-right-radius: ${(props) => props.theme.borderRadiusLG};
        }
      }
    }
  }
  // .data-grid-row:nth-child(odd) {
  //   background-color: ${(props) => props.theme.colorBgContainer};
  // }
`;

/**
 *
 * @param {height} height : if pass height value as 'fix-scroll',
 *  the height of table is caulate base on document height minus height of scrol items like header, footer
 *  to make table sticky header and not make body overflow scroll
 * @returns
 */
export function TreeTable({
  rows,
  height,
  columns,
  children,
  onChange,
  customClassName = '',
  ...rest
}) {
  const [tableHeight, setTableHeight] = useState(height);
  const tableRef = useRef(null);
  const size = useSize(document.querySelector('html'));

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
        setTableHeight(
          `calc(100vh - ${getScrollItemsHeight()} - 15px - ${h}px )`,
        );
        // 20px là để bên dưới bảng ko bị sát màn hình quá
      }, 200);
    }
  }, [size?.width]);

  return (
    <CustomGridData
      className={customClassName + ' center-row-grid'}
      rowClassName="data-grid-row"
      width="100%"
      ref={tableRef}
      dataSource={rows}
      columns={columns}
      pagination={false}
      columnWidth="auto"
      bordered={true}
      onChange={(pagination, filters, sorter) => {
        if (onChange) {
          onChange(pagination, filters, sorter); // cho phép call ngược ra bên ngoài đê xử lý filter, sort
        }
      }}
      scroll={{ y: size?.height > 600 ? tableHeight || 'auto' : 'auto' }}
      {...rest}
    ></CustomGridData>
  );
}

export default TreeTable;

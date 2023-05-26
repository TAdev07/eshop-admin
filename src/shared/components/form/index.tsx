/* eslint-disable react-hooks/exhaustive-deps */
import { useWindowSize } from 'react-use';
import { Form as AntForm } from 'antd';
import React, { useEffect, useState } from 'react';
import { getScrollFormItemsHeight } from 'shared/utils';
import styled from 'styled-components';
// import { useTranslation } from "react-i18next";
const CustomFormData = styled.div.attrs(
  (props: { scroll: string; havTable: boolean }) => ({
    ...props,
  }),
)`
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.06);
  padding: 16px;
  height: ${(props) => props.scroll};
  border-radius: 10px;
  overflow: ${(props) => (props.havTable ? 'hidden' : 'hidden auto')};
  background-color: ${(props) => props.theme.colorBgBase};
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
`;
/**
 *
 * @param {height} height : if pass height value as 'fix-scroll',
 *  the height of table is caulate base on document height minus height of scrol items like header, footer
 *  to make table sticky header and not make body overflow scroll
 * @returns
 */
export const FormWrapper = ({
  height = 'fix-scroll',
  offsetBottom = 20,
  ...rest
}) => {
  const [formHeight, setFormHeight] = useState(height);
  const size = useWindowSize();
  useEffect(() => {
    if (height === 'fix-scroll') {
      setTimeout(() => {
        setFormHeight(
          `calc(100vh - ${getScrollFormItemsHeight()} - ${offsetBottom}px)`,
        );
      }, 200);
    } else {
      setTimeout(() => {
        setFormHeight(`calc(${height}px - ${offsetBottom}px)`);
      }, 200);
    }
  }, [size?.width, height]);

  return <CustomFormData scroll={formHeight} {...rest}></CustomFormData>;
};

export const Form = styled(AntForm)`
  .ant-form-item
    .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    )::before {
    content: '';
  }
  .ant-form-item
    .ant-form-item-label
    > label.ant-form-item-required:not(
      .ant-form-item-required-mark-optional
    )::after {
    display: inline-block;
    margin-inline-end: 4px;
    color: ${(props) => props.theme.colorError};
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }
`;

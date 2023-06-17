import styled, { css } from 'styled-components';

import { Tabs } from 'antd';

export default styled(Tabs)`
  &.ant-tabs-top > .ant-tabs-nav::before,
  &.ant-tabs-bottom > .ant-tabs-nav::before,
  &.ant-tabs-top > div > .ant-tabs-nav::before,
  &.ant-tabs-bottom > div > .ant-tabs-nav::before {
    border-bottom: 1px solid transparent !important;
  }
`;

export const StyledTabPane = styled(Tabs.TabPane)``;

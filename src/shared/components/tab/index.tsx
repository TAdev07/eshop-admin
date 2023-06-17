import { TabsProps } from 'antd';
import React from 'react';

import StyledTabs, { StyledTabPane } from './StyledTabs';

function Tabs(props: TabsProps) {
  return <StyledTabs {...props}>{props.children}</StyledTabs>;
}
Tabs.TabPane = StyledTabPane;
export default Tabs;

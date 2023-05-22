import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { useWindowSize } from 'react-use';

// components
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Badge, Layout, theme } from 'antd';
import UserPopover from 'shared/layout/header/UserPopover';

const { Header } = Layout;

type HeaderLayoutProps = {
  collapsed: boolean;
  setCollapsed: (data: boolean) => void;
};

const HeaderLayout = ({ collapsed, setCollapsed }: HeaderLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      className="d-flex justify-content-between ps-1 pe-5"
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      <div className="d-flex gap-4 align-items-center">
        <Badge count={4}>
          <BellOutlined style={{ fontSize: '20px' }} />
        </Badge>

        <UserPopover />
      </div>
    </Header>
  );
};
export default HeaderLayout;

import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// components
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { ToastContainer } from 'react-toastify';
import HeaderLayout from '../header';

const { Sider, Content } = Layout;

type MainLayoutProps = {
  menuData: MenuProps['items'];
};

const MainLayout = ({ menuData }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">ES</span>
            <span className="lg-logo">EShop</span>
          </h2>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == 'signout') {
              //
            } else {
              navigate(key);
            }
          }}
          items={menuData}
        />
      </Sider>
      <Layout className="site-layout">
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: 8,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

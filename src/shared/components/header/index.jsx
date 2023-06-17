import Icon from '@ant-design/icons';
import {
  Breadcrumb,
  Card,
  Divider,
  Drawer,
  Layout,
  Space,
  Typography,
} from 'antd';
import useAxios from 'axios-hooks';
import Introduce from 'login/Pages/ListSubSystem/introduce';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AUTH_API } from 'shared/api';
import { Center, Img, Logo, Spacer, VCenter } from 'shared/components';
import { externals, listSystem } from 'shared/layout/constants';
import { setTenants } from 'shared/reduxGlobal/actions';
import { axiosPut } from 'shared/request';
import styled, { useTheme } from 'styled-components';
import { ReactComponent as AppIcon } from './app.svg';
import { UserPopover } from './userPopover';
const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
});
export function Header({ showApps, showIntro, icon }) {
  const iconComponent = icon || AppIcon;
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openIntro, setOpenIntro] = useState(false);
  const breadcumData = useSelector((state) => state.nav?.selectedItem);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [{ data }, executeGet] = useAxios(
    {
      url: AUTH_API.LIST_SYSTEM,
    },
    {
      manual: true,
      useCache: false,
    },
  );
  useEffect(() => {
    if (data) {
      dispatch(setTenants(data?.tenants || []));
      if (!data?.onboarded) {
        setOpenIntro(true);
        axiosPut(AUTH_API.SET_SHOW_INTRO + `?onboarded=true`, {
          onboarded: true,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    executeGet();
  }, []);
  return (
    <>
      <Layout.Header
        style={{
          background: theme.colorBgContainer,
          height: 64,
          justifyContent: 'space-between',
          display: 'flex',
          padding: `0 16px`,
        }}
        className="scroll-caculate-item scroll-form-caculate-item scroll-caculate-item-treenav"
      >
        <Container style={{ width: 244 }}>
          {showApps ? (
            <>
              <Icon
                component={iconComponent}
                style={{
                  fontSize: 28,
                  cursor: 'pointer',
                }}
                onClick={showDrawer}
              />
              <VCenter style={{ flex: 1, marginLeft: 16 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {showApps}
                </Typography.Title>
              </VCenter>
            </>
          ) : (
            <Center style={{ flex: 1 }}>
              <Logo height="40px" />
            </Center>
          )}
        </Container>
        {breadcumData && (
          <Container>
            <Breadcrumb>
              {breadcumData.parents.map((item) => (
                <Breadcrumb.Item key={item.key}>
                  <Link to={item.url}>{item.name}</Link>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </Container>
        )}
        <Spacer />
        <Container>
          <Space size={'middle'}>
            {showIntro && <Introduce open={openIntro} />}
            <UserPopover />
          </Space>
        </Container>
      </Layout.Header>
      <Drawer
        title={
          <Typography.Link href="/" style={{ fontSize: 20 }}>
            Smart Management Center
          </Typography.Link>
        }
        placement="left"
        onClose={onClose}
        open={open}
        width={386}
        closeIcon={
          <Icon
            component={iconComponent}
            style={{
              fontSize: 28,
              cursor: 'pointer',
            }}
          />
        }
        css={`
          .ant-drawer-body {
            overflow: overlay;
          }
          .ant-drawer-header {
            border-bottom: none;
          }
        `}
      >
        <Space wrap style={{ width: '338px' }} align="center">
          {listSystem.map((item) => (
            <a href={item.url} style={{ display: 'block' }} key={item.id}>
              <Card hoverable size="small" style={{ width: 165 }}>
                <Img
                  src={`/icons/system/${item.code}.png`}
                  key={item.id}
                  style={{ width: 32, height: 32, marginRight: 8 }}
                />
                {item.name}
              </Card>
            </a>
          ))}
        </Space>
        <Divider />
        <Typography.Text style={{ fontSize: 12 }}>
          {t('title.external')}
        </Typography.Text>
        <Space wrap style={{ marginTop: 16, width: '338px' }}>
          {externals.map((item) => (
            <a href={item.url} style={{ display: 'block' }} key={item.id}>
              <Card hoverable size="small" style={{ width: 165 }}>
                <Img
                  src={`/icons/system/${item.code}.png`}
                  key={item.id}
                  style={{ width: 32, height: 32, marginRight: 8 }}
                />
                {item.name}
              </Card>
            </a>
          ))}
        </Space>
      </Drawer>
    </>
  );
}

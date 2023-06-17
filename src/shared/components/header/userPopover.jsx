import {
  BgColorsOutlined,
  GlobalOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Divider, List, Popover, Typography } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_API } from 'shared/api';
import { signout } from 'shared/reduxGlobal/slices/auth';
import { getRefreshToken } from 'shared/services';
import { ThemeToggle } from 'shared/themes';
import { LocaleToggle } from 'shared/translations';
import { stringAvatar } from 'shared/utils';
import styled from 'styled-components';
import { VIcon } from 'shared/components';

const ListItem = styled.li`
  display: flex;
  padding: 12px 24px;
  align-items: center;
  cursor: ${(props) => (props.button ? 'pointer' : 'default')};
`;
const ListItemAvatar = styled.div`
  margin-right: 16px;
`;
const ListItemText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export function UserPopover() {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const onLogout = () => {
    axios
      .post(AUTH_API.LOGOUT, { refreshToken: getRefreshToken() })
      .then((res) => {
        dispatch(signout());
      });
  };
  const onProfileBtnClick = () => {
    setOpen(false);
    window.open('/apps/user');
  };
  const content = (
    <List style={{ minWidth: '320px' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar {...stringAvatar(userInfo?.user_name)} size={60} />
        </ListItemAvatar>
        <Typography.Title style={{ margin: 0 }} level={3}>
          {userInfo?.user_name}
        </Typography.Title>
      </ListItem>
      {/* <Divider style={{ margin: 0 }} /> */}
      <ListItem button onClick={onProfileBtnClick}>
        <ListItemAvatar>
          <UserOutlined />
        </ListItemAvatar>
        <ListItemText>
          <Typography.Text>{t('title.profile')}</Typography.Text>
        </ListItemText>
      </ListItem>
      <Divider style={{ margin: 0 }} />
      <ListItem>
        <ListItemAvatar>
          <GlobalOutlined />
        </ListItemAvatar>
        <ListItemText>
          <Typography.Text>{t('language.label')}</Typography.Text>
          <LocaleToggle />
        </ListItemText>
      </ListItem>
      {/* <ListItem>
        <ListItemAvatar>
          <BgColorsOutlined />
        </ListItemAvatar>
        <ListItemText>
          <Typography.Text>{t('title.theme')}</Typography.Text>
          <ThemeToggle />
        </ListItemText>
      </ListItem> */}
      <Divider style={{ margin: 0 }} />
      <ListItem onClick={onLogout} button>
        <ListItemAvatar>
          <VIcon color="#ff4d4f" name="logoutOutline" />
        </ListItemAvatar>
        <ListItemText>
          <Typography.Text type="danger">{t('title.logout')}</Typography.Text>
        </ListItemText>
      </ListItem>
    </List>
  );
  return (
    <Popover
      arrow={false}
      placement="bottomRight"
      content={content}
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Avatar {...stringAvatar(userInfo?.user_name)} />
    </Popover>
  );
}

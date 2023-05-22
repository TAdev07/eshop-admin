// components
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, List, Popover, Space, Typography } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

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

function UserPopover() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const content = (
    <List style={{ minWidth: '320px' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar size={60}>Admin</Avatar>
        </ListItemAvatar>
        <Typography.Title style={{ margin: 0 }} level={3}>
          Admin
        </Typography.Title>
      </ListItem>
      {/* <Divider style={{ margin: 0 }} /> */}
      <ListItem button>
        <ListItemAvatar>
          <UserOutlined />
        </ListItemAvatar>
        <ListItemText>
          <Typography.Text strong>Thông tin tài khoản</Typography.Text>
        </ListItemText>
      </ListItem>
      <Divider style={{ margin: 0 }} />
      <ListItem button>
        <ListItemAvatar>
          <LogoutOutlined style={{ color: '#ff4d4f' }} />
        </ListItemAvatar>
        <ListItemText>
          <Typography.Text strong type="danger">
            Log out
          </Typography.Text>
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
      <Space align="center">
        <Avatar
          size={34}
          icon={<UserOutlined style={{ display: 'inline-flex' }} />}
        >
          Admin
        </Avatar>
        <Typography.Title level={5} style={{ marginBottom: 0 }}>
          Admin
        </Typography.Title>
      </Space>
    </Popover>
  );
}

export default UserPopover;

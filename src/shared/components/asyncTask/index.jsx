import {
  CheckCircleTwoTone,
  ClearOutlined,
  CloseOutlined,
  FileTwoTone,
  InfoCircleTwoTone,
  LoadingOutlined,
} from '@ant-design/icons';
import { Button, Collapse, List, Progress } from 'antd';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SockJsClient from 'react-stomp';
import { SOCKET_URL } from 'shared/api/common';
import {
  clearAsyncTasks,
  removeAsyncTask,
  updateAsyncTask,
} from 'shared/reduxGlobal/actions';
import {
  buildFileUrlWithToken,
  buildUrlWithToken,
  downloadURI,
} from 'shared/utils';
import styled from 'styled-components';
import { STATUS, STATUS_LABEL } from './constants';
const StyledCollape = styled(Collapse)`
  .ant-collapse-header {
    background-color: #0381fe;
    color: #fff !important;
  }
`;
const ExtraWrapper = styled.div`
  margin-left: 8px;
  display: flex;
  gap: 4px;
`;

const extraItem = (item, dispatch) => {
  switch (item.status) {
    case STATUS.ERROR:
      return (
        <ExtraWrapper>
          <InfoCircleTwoTone style={{ fontSize: 22 }} twoToneColor="#FF3B30" />
          <Button
            icon={<CloseOutlined />}
            type="text"
            shape="circle"
            onClick={() => dispatch(removeAsyncTask(item))}
          />
        </ExtraWrapper>
      );
    case STATUS.SUCCESS:
      return (
        <ExtraWrapper>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 22 }} />
          <Button
            icon={<CloseOutlined />}
            type="text"
            shape="circle"
            onClick={() => dispatch(removeAsyncTask(item))}
          />
        </ExtraWrapper>
      );
    case STATUS.PROCESSING:
      return (
        <ExtraWrapper>
          <Progress
            type="circle"
            percent={item?.percent}
            size={22}
            showInfo={false}
          />
        </ExtraWrapper>
      );
    case STATUS.NEW:
    default:
      return (
        <ExtraWrapper>
          <LoadingOutlined style={{ fontSize: 22, color: '#1677ff' }} />
        </ExtraWrapper>
      );
  }
};

const wsUrl = buildUrlWithToken(SOCKET_URL);
const downloadFile = (item) => {
  if (!item?.fileId) return;
  const url = buildFileUrlWithToken(item.fileId);
  downloadURI(url);
};
export function AsyncTask() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.asyncTask.data);
  const tasks = useMemo(() => Object.values(data), [data]);
  const getHeader = useMemo(() => {
    const counts = tasks.reduce((total, cur) => {
      const status = cur.status;
      total[status] = (total[status] || 0) + 1;
      return total;
    }, []);
    const countsText = counts
      .map((d, i) => (d > 0 ? `${d} ${STATUS_LABEL[i]}` : null))
      .filter((d) => d)
      .join(', ');
    return `Tiến trình (${countsText})`;
  }, [tasks]);
  const onMessage = (message) => {
    try {
      console.log('message soket', message);
      const data = JSON.parse(message.data || '{}');
      if (data?.reqId) {
        const item = {};
        item.status =
          data?.status === 'PROCESSING'
            ? 3
            : data?.status === 'SUCCESS'
            ? 1
            : 2;
        item.message = data?.message;
        item.fileId = data?.fileId || null;
        item.id = data?.reqId || '';
        if (data?.status === 'PROCESSING' && data?.percent) {
          item.description = `${data?.percent}%`;
          item.percent = data?.percent || 0;
        }
        if (message?.title) item.name = message.title;

        dispatch(updateAsyncTask({ ...item }));
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const onClearTasks = (e) => {
    e.stopPropagation();
    dispatch(clearAsyncTasks());
  };
  const Extra = (
    <Button
      icon={<ClearOutlined />}
      onClick={onClearTasks}
      shape="circle"
      style={{ marginLeft: 8 }}
      size="small"
    />
  );
  const renderTask = (item) => (
    <List.Item extra={extraItem(item, dispatch)}>
      <List.Item.Meta
        avatar={<FileTwoTone />}
        title={item?.name}
        description={item?.message || item?.description}
        style={item?.fileId && { cursor: 'pointer' }}
        onClick={() => downloadFile(item)}
      />
    </List.Item>
  );
  return (
    <>
      {tasks.length > 0 && (
        <StyledCollape defaultActiveKey={['1']}>
          <Collapse.Panel header={getHeader} key="1" extra={Extra}>
            <List dataSource={tasks} renderItem={renderTask} />
          </Collapse.Panel>
        </StyledCollape>
      )}
      <SockJsClient
        url={wsUrl}
        topics={['/topic/notification']}
        onMessage={onMessage}
        headers={{
          'Access-Control-Allow-Credentials': true,
        }}
      />
    </>
  );
}

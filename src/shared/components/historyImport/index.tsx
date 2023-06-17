import {
  CloseOutlined,
  DownloadOutlined, FilterOutlined
} from '@ant-design/icons';
import { useInjectReducer } from 'ai/redux/injectReducer';
import { useInjectSaga } from 'ai/redux/injectSaga';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { HISTORY_IMPORT, HISTORY_IMPORT_SENSOR } from 'shared/api';
import { PageHeader, Pagination, Table } from 'shared/components';
import { buildFileUrlWithToken, downloadURI } from 'shared/utils';
import * as actions from './actions';
import { Filter } from './components/Filter';
import reducer from './reducer';
import saga from './saga';
import {
  selectList,
  selectLoading,
  selectPaging,
  selectParams
} from './selectors';
const key = 'historyImport';

const HistoryImport = () => {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const location = useLocation();
  
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading());
  const data = useSelector(selectList());
  const paging = useSelector(selectPaging());
  const paramsSearch = useSelector(selectParams());
  const [openFilter, setOpenFilter] = useState(false);
  const isFilter = [
    paramsSearch?.startTime,
    paramsSearch?.endTime,
  ].some((i) => !!i);
  const pathBase =  window.location.pathname.split('/')[2];
  const pathHistory = (nameScreen) => {
    switch (nameScreen) {
      case 'sensor':
        return HISTORY_IMPORT_SENSOR;
      case 'ai':
        return HISTORY_IMPORT;
      default:
        return;
    }
  }

  useEffect(() => {
    return () => Modal.destroyAll();
  }, []);
  useEffect(() => {
    dispatch(actions.fetchAll(paramsSearch, pathHistory(pathBase)));
  }, [paramsSearch]);

  const columns = [
    {
      title: "Tên tệp tải lên",
      dataIndex: 'name',
    },
    {
      title: "Thời gian tải lên",
      dataIndex: 'createdAt',
      dataType: 'datetime',
      // sorter: true,
    },
    {
      title: "Kết quả tải lên",
      dataIndex: 'successNumber',
      render: (text, record) => {
        let colorSuccess = 'green';
        return (
          <div>
            <span style={{ color: colorSuccess}}>{record?.successNumber}</span>/{record?.totalNumber}
          </div>
        );
      },
    },
    {
      title: 'Hành động',
      dataType: 'buttons',
      buttons: [
        {
          icon: <DownloadOutlined />,
          type: 'text',
          title: 'Tải xuống',
          onClick: ({ record }) => downloadFile(record),
        },
      ],
    },
  ];

  const buttons: Array<any> = [
    {
      children: t('action.filter'),
      style: isFilter
        ? {
            color: 'blue',
            borderColor: 'blue',
          }
        : undefined,
      icon: <FilterOutlined />,
      onClick: () => setOpenFilter(true),
    },
  ];



  const downloadFile = (item) => {
    if (!item?.fileId) return;
    const url = buildFileUrlWithToken(item.fileId);
    downloadURI(url);
  };
  
  const onChange = (page, limit) =>
    dispatch(actions.setParamsSearch({ ...paramsSearch, page, limit }));
  const onChangeTable = ({ sorter, filters }) => {
    const params = {
      ...paramsSearch,
      page: 1,
    };
    if (['descend', 'ascend'].includes(sorter?.order)) {
      params.sort =
        sorter?.order === 'descend'
          ? `-${sorter?.field}`
          : sorter?.order === 'ascend'
          ? `${sorter?.field}`
          : undefined;
    }
    dispatch(actions.setParamsSearch(params));
  };

  const onSearchDebounce = (inputValue) => {
    dispatch(actions.setParamsSearch({ ...paramsSearch, page: 1, fileName: inputValue.toLowerCase(), }));
  };

  const onFilter = (values) => {
    dispatch(actions.setParamsSearch({ ...paramsSearch, page: 1, ...values }));
  };

  const currentScreen = location?.pathname?.split('/').slice(-1).join();
  const dataScreen = data.filter(
    item =>
      item.type === currentScreen,
  );
  return (
    <div>
      <PageHeader
        showSearch
        onSearch={onSearchDebounce}
        searchDefaultValue={paramsSearch.fileName}
        buttons={buttons}
        showBackButton
        title='Lịch sử tải lên'
        className="scroll-form-caculate-item"
      />
      <Table
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={dataScreen}
        onChange={onChangeTable}
        rowKey="id"
        actions={undefined}
        pageIndex={undefined}
        pageSize={undefined}
      />
       <Pagination
        onChange={onChange}
        {...paging}
        className="scroll-caculate-item"
      />
      <Filter
        open={openFilter}
        title="Bộ lọc"
        closable={false}
        extra={
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => setOpenFilter(false)}
          />
        }
        onClose={() => setOpenFilter(false)}
        onApply={onFilter}
        initialValues={{
          nvrsStartTime: paramsSearch?.startTime,
          nvrsEndTime: paramsSearch?.endTime,
        }}
      />
    </div>
  );
};
export default HistoryImport;

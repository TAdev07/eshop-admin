import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// components
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  PlusOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Col, Modal, Row, TabsProps, Tooltip } from 'antd';
import { getProducts } from 'features/product/productSlice';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Pagination } from 'shared/components';

// utils
import { DEFAULT_PARAMS } from 'shared/configs/constants';

const { confirm } = Modal;

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [openFilter, setOpenFilter] = useState(false);
  const [paramSearch, setParamSearch] = useState({
    ...DEFAULT_PARAMS,
    // ...location.state?.[PAGE_KEY]?.filter,
  });
  const [paging, setPaging] = useState({ total: 10, current: 1, pageSize: 20 });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const isFilter = () => {
    return false;
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);
  const data1 = [];

  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color,
      price: `${productState[i].price}`,
    });
  }

  const handleDelete = ({
    type,
    ids,
  }: {
    type: 'multiple' | 'single';
    ids: React.Key[];
  }) => {
    confirm({
      icon: true,
      title: 'Xóa tủ trung tâm?',
      content:
        type === 'multiple'
          ? `Bạn có chắc muốn xoá ${selectedRowKeys.length} items đã chọn?`
          : `Bạn có chắc muốn xoá thông tin này?`,
      okText: 'Xóa',
      okType: 'primary',
      closable: false,
      okButtonProps: {
        disabled: false,
      },
      cancelText: 'Quay lại',
      onCancel() {
        //
      },
      onOk: async () => {
        // executeDelete({ ids });
      },
    });
  };

  const buttons: Array<any> = [
    {
      icon: <FilterOutlined />,
      children: 'Lọc',
      onClick: () => setOpenFilter(true),
      style: {
        color: isFilter() ? 'blue' : undefined,
      },
    },
    {
      icon: <SyncOutlined />,
      children: 'Đồng bộ',
      disabled: true,
    },
    {
      icon: <DeleteOutlined />,
      children: 'Xoá',
      disabled: selectedRowKeys?.length < 1,
      onClick: () => handleDelete({ ids: selectedRowKeys, type: 'multiple' }),
    },
    {
      icon: <PlusOutlined />,
      children: t('action.add'),
      type: 'primary',
      onClick: () => {
        // navigate(`add`, {
        //   state: {
        //     ...location.state,
        //     [PAGE_KEY]: { filter: paramSearch },
        //   },
        // }),
      },
    },
  ];

  const onPaginate = (page, limit) =>
    setParamSearch({ ...paramSearch, page, limit });

  const actions = {
    title: 'Hành động',
    dataType: 'buttons',
    align: 'center',
    width: 150,
    buttons: [
      {
        title: 'Sửa',
        loadingId: 1,
        icon: <EditOutlined />,
      },
      {
        title: 'Xóa',
        loadingId: 1,
        icon: <DeleteOutlined />,
      },
    ],
  };

  return (
    <div>
      <PageHeader
        // onSearchDebounce={handleEasySearch}
        title="Danh sách sản phẩm"
        showSearch
        searchPlaceholder="Tìm kiếm tên, IP, MAC"
        // searchDefaultValue={paramSearch.keyword}
        buttons={buttons}
        className="scroll-caculate-item scroll-caculate-item-treenav"
      />
      <Table actions={actions} columns={columns} dataSource={data1} />
      <Pagination
        onChange={onPaginate}
        {...paging}
        className="scroll-caculate-item"
      />
    </div>
  );
}

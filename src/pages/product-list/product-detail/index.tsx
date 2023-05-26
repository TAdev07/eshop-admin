import { isEqual } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// components
import {
  ButtonProps,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Tabs,
  TabsProps,
  InputNumber,
} from 'antd';
import { PageHeader, FormWrapper, AsyncSelect } from 'shared/components';
import styled from 'styled-components';

const { confirm } = Modal;

const FormStyled = styled(Form)`
  div.ant-form-item-explain .ant-form-item-explain-error {
    font-size: 12px;
    &:not(:first-child) {
      display: none;
    }
  }
`;

const items: TabsProps['items'] = [
  {
    key: '',
    label: `Chi tiết tủ trung tâm`,
  },
  {
    key: 'zone',
    label: `Danh sách zone`,
  },
];

export default function PanelDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [form] = Form.useForm();
  const isEdit = !!params?.panelId;

  const [initValue, setInitValue] = useState<any>({
    area: undefined,
    devicePanelName: undefined,
    ip: undefined,
    mac: undefined,
    password: undefined,
    source: undefined,
    userName: undefined,
  });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [smcArea, setSmcArea] = useState(null);

  const handleSubmit = async (values) => {
    const { status, area, ...rest } = values;
  };

  const onBack = () => {
    navigate('/admin/list-product', {
      state: {
        ...location.state,
      },
    });
  };

  const confirmBack = () => {
    confirm({
      icon: true,
      title: 'Thông tin chưa được lưu',
      content: `Bạn có muốn thoát khỏi trang này`,
      okText: 'Thoát',
      okType: 'primary',
      closable: false,
      okButtonProps: {
        disabled: false,
      },
      cancelText: 'Ở lại',
      onOk: async () => {
        onBack();
        form.resetFields();
      },
    });
  };

  const buttons: Array<ButtonProps> = [
    {
      type: 'default',
      children: t('form.cancel'),
      onClick: () =>
        !isEqual(initValue, form.getFieldsValue()) ? confirmBack() : onBack(),
    },
    {
      type: 'primary',
      children: isEdit ? t('action.update') : t('action.add'),
      onClick: () => form.submit(),
    },
  ];

  const onTabChange = (key: string) => {
    navigate(key, {
      state: location.state,
    });
  };

  return (
    <Spin spinning={false}>
      <PageHeader
        showBackButton
        title={isEdit ? '' : 'Thêm mới sản phẩm'}
        titleContent={
          isEdit ? (
            <Tabs
              tabBarStyle={{ margin: 0 }}
              defaultActiveKey={'camera'}
              activeKey={''}
              items={items}
              onChange={onTabChange}
            />
          ) : undefined
        }
        className="scroll-form-caculate-item"
        buttons={buttons}
        onBack={onBack}
      />
      <FormWrapper>
        <FormStyled
          layout="vertical"
          form={form}
          className="form-item"
          onFinish={handleSubmit}
        >
          <Row gutter={[20, 0]} className="form-row">
            <Col span={6}>
              <Form.Item
                label="Tên sản phẩm"
                name="title"
                required
                rules={[
                  {
                    required: true,
                    message: 'Trường thông tin bắt buộc',
                  },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" maxLength={100} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Giá sản phẩm"
                name="price"
                required
                rules={[
                  {
                    required: true,
                    message: 'Trường thông tin bắt buộc',
                  },
                ]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                  placeholder="Nhập giá sản phẩm"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Số lượng sản phẩm" name="quantity">
                <InputNumber placeholder="Nhập số lượng sản phẩm" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: 'Trường thông tin bắt buộc',
                  },
                ]}
              >
                <AsyncSelect
                // loadOptions={(search, prevOptions, additional) =>
                //   new Promise((resolve, reject) => {
                //     axiosGet(`${AREAS.list}`, {
                //       page,
                //       limit: 50,
                //       keyword,
                //     })
                //       .then((result) => {
                //         const newData = result?.data?.rows || [];
                //         resolve({
                //           data: newData,
                //           totalCount: result?.data?.count,
                //         });
                //       })
                //       .catch((err) => reject(err.message));
                //   })
                // }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Password"
                name="password"
                required
                rules={[
                  {
                    required: true,
                    message: 'Trường thông tin bắt buộc',
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Mật khẩu cần tối thiểu 8 ký tự, bao gồm chữ Hoa, chữ thường, số và ký tự đặc biệt',
                  },
                ]}
              >
                <Input.Password
                  // visibilityToggle={{
                  //   visible: passwordVisible,
                  //   onVisibleChange: setPasswordVisible,
                  // }}
                  placeholder="Nhập password"
                  autoComplete="new-password"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Nguồn"
                name="source"
                required
                rules={[
                  {
                    required: true,
                    message: 'Trường thông tin bắt buộc',
                  },
                ]}
              >
                <Select allowClear placeholder="Chọn nguồn" disabled={isEdit}>
                  <Select.Option>Test</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Trạng thái" name="status">
                <Input disabled placeholder="Vui lòng nhập mã thẻ" />
              </Form.Item>
            </Col>
          </Row>
        </FormStyled>
      </FormWrapper>
    </Spin>
  );
}

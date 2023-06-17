import {
  Button,
  DatePicker,
  Drawer,
  DrawerProps,
  Form, Space
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { FlexCol } from 'shared/components';

type FilterProps = DrawerProps & {
  onApply?: any;
  onReset?: any;
  initialValues?: any;
};
const initValue = {
  startTime: undefined,
  endTime: undefined,
};
export function Filter({
  onApply,
  onReset,
  initialValues = {
    ...initValue,
  },
  ...rest
}: FilterProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      const init = { ...initialValues };
      init.search_time = [
        dayjs(initialValues?.startTime),
        dayjs(initialValues?.endTime),
      ];
      form.setFieldsValue({
        startTime: initialValues?.nvrsStartTime,
        endTime: initialValues?.nvrsEndTime,
      });
    }
  }, [initialValues]);

  const handleSubmit = (values) => {
    const valueFilter = { ...values };
    if (values.search_time) {
      valueFilter.startTime = values.search_time[0].startOf('day').valueOf();
      valueFilter.endTime = values.search_time[1].endOf('day').valueOf();
    } else {
      valueFilter.startTime = undefined;
      valueFilter.endTime = undefined;
    }
    delete valueFilter.search_time;
    onApply(valueFilter);
    rest.onClose(null);
  };

  return (
    <Drawer
      {...rest}
      footer={
        <Button
          style={{ width: '100%', fontWeight: 700 }}
          type="primary"
          onClick={() => form.submit()}
        >
          Áp dụng
        </Button>
      }
    >
      <Form
        layout="vertical"
        form={form}
        initialValues={initValue}
        onFinish={handleSubmit}
      >
        <FlexCol style={{ gap: 20 }}>
          <Form.Item label="Thời gian tải lên" name="search_time">
            <DatePicker.RangePicker
              style={{ width: '100%' }}
            ></DatePicker.RangePicker>
          </Form.Item>
        </FlexCol>
      </Form>

      <Space direction="vertical" style={{ width: '100%', marginTop: 30 }}>
        <Button
          style={{ width: '100%', fontWeight: 700 }}
          type="default"
          onClick={() => {
            form.resetFields();
          }}
        >
          Mặc định
        </Button>
      </Space>
    </Drawer>
  );
}

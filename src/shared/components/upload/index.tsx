import { CopyOutlined, FileOutlined } from '@ant-design/icons';
import { Button, Modal, ModalProps, Spin, Upload } from 'antd';
import useAxios from 'axios-hooks';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/first
import { useTranslation } from 'react-i18next';
import { showError, showWarning } from 'shared/utils';
const { Dragger } = Upload;
type UploadProps = ModalProps & {
  sample?: object;
  loading?: boolean;
  description?: string;
  fileConfig?: object;
};
export const UploadPopup = (props: UploadProps) => {
  const {
    open,
    sample,
    onOk,
    description,
    loading = false,
    fileConfig,
    ...rest
  } = props;
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  useEffect(() => () => setFile(null), [open]);
  const handleSubmit = () => {
    if (file) onOk(file);
  };
  const defaultFileConfig = {
    accept: '.xlsx',
    showUploadList: false,
    name: 'file',
    multiple: false,
    maxCount: 1,
  };
  const propsUpload = {
    ...defaultFileConfig,
    ...fileConfig,
    beforeUpload: (fil) => {
      if (fil.size < 20000000) {
        setFile(fil);
      } else {
        showWarning(
          'Không thành công',
          'Dung lượng tập tin không được vượt quá 20MB',
        );
        return false;
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const [{ loading: loadingGetSample, error }, executeGetSample] = useAxios(
    { ...sample, responseType: 'blob' },
    {
      manual: true,
    },
  );
  useEffect(() => {
    if (error) {
      showError(error?.message);
    }
  }, [error]);
  const onDownloadSample = () => {
    executeGetSample();
  };
  return (
    <Modal
      title="Tải lên danh sách"
      {...rest}
      open={open}
      width={800}
      onOk={handleSubmit}
      okText={t('action.upload')}
      onCancel={(e) => {
        props.onCancel(e);
        setFile(null);
      }}
      okButtonProps={{ loading: loading }}
      cancelButtonProps={{ disabled: loading }}
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <p>{t('components.import.maximum-file')}</p>
        <Dragger {...propsUpload} style={{ padding: 0 }}>
          <div
            style={{ display: 'flex', padding: '0 12px', alignItems: 'center' }}
          >
            <p>{file?.name}</p>
            <CopyOutlined style={{ marginLeft: 'auto' }} />
          </div>
        </Dragger>
        <p style={{ marginTop: 12, marginBottom: 12 }}>
          {description ||
            `Hệ thống sẽ so sánh dữ liệu mà bạn tải lên để thêm mới công việc vào
          hệ thống. Điều này đồng nghĩa với việc bạn phải chuẩn bị sẵn mẫu dữ
          liệu cho công việc mà bạn muốn thêm mới.`}
        </p>
        <p style={{ fontWeight: 'bold', marginBottom: 12 }}>{`${t(
          'components.import.downloadTemplatePlace',
        )}: `}</p>
        <Button
          onClick={onDownloadSample}
          icon={<FileOutlined />}
          loading={loadingGetSample}
        >
          {t('components.import.downloadTemplate')}
        </Button>
      </Spin>
    </Modal>
  );
};

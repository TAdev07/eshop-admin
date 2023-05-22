import {
  CloudUploadOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Input, Row, Tooltip } from 'antd';
import React, { Children, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
interface ActionsProps {
  onSave?: any;
  onCancel?: any;
  onAdd?: any;
  onUpload?: any;
  onSearch?: any;
  onFilter?: any;
  children?: ReactNode;
  className?: string;
}
export const Actions = ({
  onSave,
  onCancel,
  onAdd,
  onUpload,
  onSearch,
  onFilter,
  children,
  ...rest
}: ActionsProps) => {
  const { t } = useTranslation();

  return (
    <Row {...rest} justify={'end'} style={{ gap: 8 }}>
      {children}
      {onSearch && (
        <Input.Search
          placeholder={t('form.search')}
          style={{ width: 'fit-content', marginLeft: 'auto' }}
          onChange={onSearch}
        ></Input.Search>
      )}
      {onFilter && (
        <Tooltip title={t('form.filter')}>
          <Button onClick={onFilter}>
            <FilterOutlined />
          </Button>
        </Tooltip>
      )}
      {onUpload && (
        <Button
          icon={<CloudUploadOutlined />}
          type="default"
          onClick={onUpload}
        >
          {t('form.upload')}
        </Button>
      )}
      {onAdd && (
        <Button type="primary" onClick={onAdd}>
          {`+ ${t('action.add')}`}
        </Button>
      )}
      {onCancel && (
        <Button
          type="default"
          style={{ minWidth: 110, minHeight: 40 }}
          onClick={onCancel}
        >
          {t('form.cancel')}
        </Button>
      )}
      {onSave && (
        <Button
          style={{ minWidth: 110, minHeight: 40 }}
          type="primary"
          onClick={onSave}
        >
          {t('form.save')}
        </Button>
      )}
    </Row>
  );
};

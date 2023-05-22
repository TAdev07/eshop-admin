import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pagination as APagination } from 'antd';
import { Box } from '../box';

export const Pagination = ({ className = '', ...rest }) => {
  const { t } = useTranslation();

  const showTotal = (total: any, range: any[]) =>
    t('data.infoText', { 0: range[0], 1: range[1], 2: total });

  const defaultProps = {
    showSizeChanger: true,
    defaultPageSize: 20,
    pageSizeOptions: [20, 50, 100],
    showTotal,
    responsive: true,
    showLessItems: true,
    // hideOnSinglePage: true,
  };

  const mergeProps = { ...defaultProps, ...rest };

  return (
    <Box
      display="flex"
      padding="8px 0"
      justify="flex-end"
      className={className}
    >
      <APagination {...mergeProps} />
    </Box>
  );
};

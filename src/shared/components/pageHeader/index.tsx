import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Box } from '../box';
import { breakpoint } from 'shared/utils/breakpoint';

type PageHeaderProps = {
  children?: React.ReactNode;
  title?: string;
  titleContent?: React.ReactNode;
  showSearch?: boolean;
  onSearch?: any;
  onSearchDebounce?: any;
  searchPlaceholder?: string;
  searchDefaultValue?: string;
  searchValue?: string;
  showBackButton?: boolean;
  onBack?: any;
  prevPage?: any;
  buttons?: Array<object>;
  className?: string;
};
const Container = styled.div`
  .PageHeader-root {
    gap: 16px;
    display: flex;
    min-height: 64px;
    padding: 0 8px;
  }
  .PageHeader-title {
    margin-right: 8px;
  }
`;
export const PageHeader = ({
  children,
  title,
  titleContent,
  showSearch,
  onSearch,
  onSearchDebounce,
  searchPlaceholder,
  searchDefaultValue = '',
  searchValue,
  showBackButton,
  onBack,
  prevPage,
  buttons = [],
  ...rest
}: PageHeaderProps) => {
  const { t } = useTranslation();
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  const onBlur = (e: { target: { value: string } }) => {
    if (
      searchValue !== undefined &&
      searchValue !== e.target.value &&
      searchRef?.current
    ) {
      setTimeout(() => {
        searchRef.current.input.value = searchValue || '';
      });
    }
  };

  const onBackBtnClick = () => {
    if (onBack) {
      onBack();
    } else {
      if (params?.is_from_login || (window.history.length <= 2 && prevPage)) {
        navigate(prevPage);
      } else navigate(-1);
    }
  };

  const renderButtons = useMemo(() => {
    if (buttons && buttons.length > 0) {
      return React.Children.toArray(
        buttons.map(({ children, icon, loading, onClick, ...rest }) => (
          <Button {...rest} onClick={!loading && onClick}>
            <Box display="flex" items="center" gap='6px' >
              {!loading ? icon : <LoadingOutlined />}
              {children}
            </Box>
          </Button>
        )),
      );
    } else return null;
  }, [buttons]);

  return (
    <Container {...rest}>
      <div className="PageHeader-root">
        <Box display="flex" items="center" gap={8} className="PageHeader-left">
          {showBackButton && (
            <Button
              size="large"
              aria-label="back"
              type="text"
              shape="circle"
              onClick={onBackBtnClick}
              icon={<ArrowLeftOutlined />}
            />
          )}
          {titleContent ? (
            <div className="PageHeader-title">{titleContent}</div>
          ) : (
            title && (
              <div className="PageHeader-title">
                <Typography.Title
                  level={4}
                  ellipsis
                  className="PageHeader-title"
                  style={{ marginBottom: 0 }}
                >
                  {title}
                </Typography.Title>
              </div>
            )
          )}
          {showSearch && (
            <Input.Search
              ref={searchRef}
              onSearch={onSearch}
              onChange={onSearchDebounce}
              placeholder={searchPlaceholder ?? t('form.search')}
              defaultValue={searchDefaultValue}
              onBlur={onBlur}
              allowClear
              style={{ width: 'auto' }}
            />
          )}
        </Box>
        {(children || buttons.length > 0) && (
          <Box
            display="flex"
            items="center"
            gap="8px"
            flex={1}
            justify="flex-end"
            className="PageHeader-right"
          >
            {renderButtons}
            {children}
          </Box>
        )}
      </div>
    </Container>
  );
};

export * from './Actions';

import useUrlState from '@ahooksjs/use-url-state';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Center, VCenter } from '../common';
import { breakpoint } from 'shared/themes/utils';
import { debounce } from 'lodash';
type PageHeaderProps = {
  children?: React.ReactNode;
  title?: string;
  titleContent?: React.ReactNode;
  showSearch?: boolean;
  onSearch?: any;
  debounceSearch?: boolean;
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
  debounceSearch = true,
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
  const [params, setParams] = useUrlState();
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
        buttons.map(({ children, icon, loading, onClick, ...rest }: any) => (
          <Button {...rest} onClick={!loading && onClick}>
            <Center style={{ gap: 6 }}>
              {!loading ? icon : <LoadingOutlined />}
              {children}
            </Center>
          </Button>
        )),
      );
    } else return null;
  }, [buttons]);
  const onSearchChange = debounce((e) => {
    if (debounceSearch && onSearch) {
      onSearch(e.target.value.trim());
    }
  }, 500);
  return (
    <Container {...rest}>
      <div className="PageHeader-root">
        <VCenter className="PageHeader-left" style={{ gap: 8 }}>
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
                  css={`
                    margin-bottom: 0 !important;
                    display: block;
                    ${breakpoint()(`display: none;
                      `)}
                  `}
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
              onChange={onSearchChange}
              placeholder={searchPlaceholder ?? t('form.search')}
              defaultValue={searchDefaultValue}
              onBlur={onBlur}
              allowClear
              style={{ width: 'auto' }}
            />
          )}
        </VCenter>
        {(children || buttons.length > 0) && (
          <VCenter
            style={{
              gap: 8,
              flex: 1,
              justifyContent: 'flex-end',
            }}
            className="PageHeader-right"
          >
            {renderButtons}
            {children}
          </VCenter>
        )}
      </div>
    </Container>
  );
};

export * from './Actions';

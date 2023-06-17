import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from 'ahooks';
import { isEqual, memoize } from 'lodash';

// components
import { Checkbox, Select } from 'antd';
import Box from 'shared/components/box';

const Option = Select.Option;

type AsyncSelectType = {
  loadOptions?: (
    search: string,
    prevOptions: any,
    additional: any,
  ) => Promise<{
    hasMore: boolean;
    options: any[];
    additional?: { [key: string]: unknown };
  }>;
  options?: any[];
  value?: any;
  multiple?: boolean;
  onChange?: (value: any, option: any) => void;
  getOptionLabel?: (option: any) => string;
  optionLabelProp?: string;
  optionValueProp?: string;
  placeholder?: string;
  cacheLoadOptions?: boolean;
};

const AsyncSelect: React.FC<AsyncSelectType> = (props) => {
  const {
    value,
    multiple,
    loadOptions,
    options,
    onChange,
    getOptionLabel = (option) => option.label || '',
    optionValueProp = 'value',
    optionLabelProp = 'label',
    placeholder,
    cacheLoadOptions = true,
  } = props;

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [checkedList, setCheckedList] = useState<any[]>([]);

  const memoizeLoadOptions = useRef(memoize(loadOptions));
  const hasMore = useRef<boolean>(true);
  const additional = useRef(null);

  const debouncedSearch = useDebounce(search, { wait: 500 });

  useEffect(() => {
    if (options && !loadOptions) {
      setDataSource(options);
    }
  }, [options]);

  useEffect(() => {
    fetchData();
  }, [debouncedSearch]);

  useEffect(() => {
    if (value && !isEqual(value, checkedList)) {
      setCheckedList(value);
    }
  }, [value]);

  const fetchData = async () => {
    if (typeof loadOptions !== 'function') return;
    try {
      setLoading(true);

      const fetchOptions = cacheLoadOptions
        ? memoizeLoadOptions.current
        : loadOptions;

      const result = await fetchOptions(
        search,
        dataSource,
        additional.current || {},
      );

      setLoading(false);

      hasMore.current = result?.hasMore;
      additional.current = result?.additional;

      setDataSource(result?.options);
    } catch (error) {
      setLoading(false);
    }
  };

  const onScroll = async (event) => {
    if (typeof loadOptions !== 'function') return;
    const target = event.target;

    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      target.scrollTo(0, target.scrollHeight);

      if (hasMore.current) {
        fetchData();
      }
    }
  };

  const onSearch = (value: string) => {
    console.log('value: ', value);
    setSearch(value);
    additional.current = null;
  };

  const handleOnChange = (value, option) => {
    setCheckedList(value);
    if (typeof onChange === 'function') {
      onChange(value, option);
    }
  };

  return (
    <Select
      showArrow
      allowClear
      loading={loading}
      mode={multiple ? 'multiple' : undefined}
      value={checkedList}
      showSearch
      style={{ width: '100%' }}
      placeholder={placeholder}
      onChange={handleOnChange}
      onSearch={onSearch}
      onPopupScroll={onScroll}
      optionLabelProp={optionLabelProp}
      searchValue={search}
      filterOption={(input, option) => {
        return true;
      }}
    >
      {dataSource.map((option) => {
        const value = option[optionValueProp] || option.id || '';
        const label =
          getOptionLabel(option) || option[optionLabelProp] || value;
        return (
          <Option key={value} value={value} label={label} {...option}>
            {multiple && (
              <Checkbox checked={checkedList.includes(value)}></Checkbox>
            )}
            <Box display="inline-block" marginLeft="8px">
              {label}
            </Box>
          </Option>
        );
      })}
    </Select>
  );
};

export default AsyncSelect;

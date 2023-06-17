/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/**
 *
 * Autocomplete
 *
 */
import { useDebounceEffect } from 'ahooks';
import { Empty, Select, Spin } from 'antd';
import { get } from 'lodash';
import { Children, useEffect, useMemo, useRef, useState } from 'react';

const Option = Select.Option;

const Loading = () => (
  // <Empty
  //   image={`${process.env.PUBLIC_URL}/load-more.svg`}
  //   imageStyle={{
  //     height: 60,
  //     margin: 0,
  //   }}
  //   description={false}
  // />
  <div
    css={`
      display: flex;
      justify-content: center;
      padding: 12px;
    `}
  >
    <Spin />
  </div>
);

const VAutocomplete = ({
  loadData, // function return Promise
  loadOnMount = true,
  multiple = false,
  firstIndex = 1,
  onFocus,
  onBlur,
  width = '100%',
  style,
  filterOption,
  paging = false,
  keyExpr = 'id',
  displayExpr = 'name',
  disableExpr,
  titleRender,
  value,
  onChange,
  listItemHeight = 32,
  depend = false,
  ...other
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [change, setChange] = useState(0);
  const inputRef = useRef();
  let page = useRef(firstIndex);
  let isMounted = useRef(true);
  let endReached = useRef(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const selectValue = useMemo(
    () =>
      value
        ? multiple
          ? [
              ...value.map((v) => ({
                value: get(v, keyExpr),
                label: get(v, displayExpr),
              })),
            ]
          : {
              value: get(value, keyExpr),
              label: get(value, displayExpr),
            }
        : undefined,
    [value, displayExpr, keyExpr, multiple],
  );
  const defaultProps = {
    autoClearSearchValue: true,
    showSearch: true,
    maxTagCount: 'responsive',
  };
  const mergeProps = {
    ...defaultProps,
    ...other,
  };

  const loadMore = () => {
    if (!endReached.current) {
      page.current = page.current + 1;
      setChange((prev) => prev + 1);
    }
  };

  useEffect(() => {
    isMounted.current = true;
    if (change <= 0 && paging) {
      return undefined;
    }
    if (!open) {
      if (loadOnMount && dataSource.length > 0) {
        return undefined;
      }
      if (!loadOnMount) {
        if (paging && isMounted.current) {
          page.current = firstIndex;
          // setDataSource([]);
        }
        return undefined;
      }
    }

    if (!paging && endReached.current && dataSource.length > 0 && !depend) {
      return undefined;
    }
    const controller = new AbortController();
    const { signal } = controller;

    (async () => {
      try {
        setLoading(true);
        const result = await loadData({
          page: page.current,
          keyword: inputValue,
          signal,
        });
        setLoading(false);
        if (isMounted.current) {
          if (page.current === firstIndex) {
            setDataSource(result.data);
            if (result.data.length === result.totalCount) {
              endReached.current = true;
            } else endReached.current = false;
          } else {
            setDataSource([...dataSource, ...result.data]);
            if (dataSource.length + result.data.length === result.totalCount) {
              endReached.current = true;
            } else endReached.current = false;
          }
        }
      } catch (err) {
        if (isMounted.current) {
          setLoading(false);
        }
        console.log(err);
      }
    })();

    return () => {
      isMounted.current = false;
      controller.abort();
    };
  }, [open, change]);

  useDebounceEffect(
    () => {
      if (paging) {
        page.current = firstIndex;
        setChange((prev) => prev + 1);
      }
    },
    [inputValue],
    { wait: 1000 },
  );

  const onScroll = (event) => {
    var target = event.target;
    if (
      !endReached.current &&
      !loading &&
      target.scrollTop + target.offsetHeight >=
        target.scrollHeight - listItemHeight * 10
    ) {
      loadMore();
    }
  };
  const onSeach = (value) => {
    setInputValue(value);
  };

  const onValueChange = (val) => {
    if (onChange) {
      if (val) {
        let data = [];
        if (multiple)
          data = dataSource.filter((d) =>
            val.map((v) => v.value).includes(get(d, keyExpr)),
          );
        else data = dataSource.filter((d) => val.value == get(d, keyExpr));
        onChange(multiple ? data : data[0]);
      } else {
        onChange(multiple ? [] : null);
      }
      if (multiple) setInputValue('');
      if (!multiple) {
        if (inputRef && inputRef.current) {
          inputRef.current.blur();
        }
      }
    }
  };

  return (
    <Select
      labelInValue
      value={selectValue}
      ref={inputRef}
      open={open}
      onFocus={() => {
        setOpen(true);
        onFocus && onFocus();
      }}
      onBlur={() => {
        setOpen(false);
        if (multiple) setInputValue('');
        onBlur && onBlur();
      }}
      style={{
        width,
        ...style,
      }}
      listItemHeight={listItemHeight}
      filterOption={
        paging
          ? false
          : filterOption
          ? filterOption
          : (input, option) => {
              return option.label
                .normalize()
                .toLowerCase()
                .includes(input.normalize().toLowerCase());
            }
      }
      mode={multiple ? 'multiple' : undefined}
      searchValue={inputValue}
      onSearch={onSeach}
      onPopupScroll={onScroll}
      loading={loading}
      notFoundContent={
        !loading && (
          <Empty
            description="Không có dữ liệu"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )
      }
      onChange={onValueChange}
      dropdownRender={(menu) => (
        <>
          {menu}
          {loading && <Loading />}
        </>
      )}
      {...mergeProps}
    >
      {Children.toArray(
        dataSource.map((item) => {
          const value = get(item, keyExpr);
          const label = get(item, displayExpr);
          return (
            <Option
              key={'cmb-item-' + value}
              value={value}
              label={label}
              disabled={disableExpr ? disableExpr(item) : false}
            >
              {titleRender && typeof titleRender == 'function'
                ? titleRender(item)
                : label}
            </Option>
          );
        }),
      )}
    </Select>
  );
};

export { VAutocomplete };

// example loadData props
// loadData={({page, keyword, signal}) =>
//   new Promise((resolve, reject) => {
//     axios.get(EVENT_API.GET_LIST, {
//       deviceName: keyword,
//       pageSize: 50,
//       index: page,
//     })
//       .then(result => {
//         resolve({
//           data: result.data.data,
//           totalCount: result.data.totalRow,
//         });
//       })
//       .catch(err => reject(err));
//   })
// }

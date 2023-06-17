import { listToTree } from 'ac/utils/format';
import { isEqual } from 'lodash';
import { useSize } from 'ahooks';
import {
  Button,
  Divider,
  Input,
  Radio,
  Row,
  Skeleton,
  Spin,
  Tooltip,
  Tree,
  Typography,
} from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AREAS, BLOCK, CAMERA_AI, FLOC_API, FLOOR, UNIT } from 'shared/api';
import { axiosGet, axiosPost } from 'shared/request';
import { breakpoint } from 'shared/themes/utils';
import { useDebounceLodash } from 'shared/utils/hooks';
import styled from 'styled-components';
import { VAutocomplete } from '../VAutocomplete';
import { FlexCol, VCenter } from '../common';
type TreeNavProps = {
  onSearch?: any;
  title?: string | React.ReactNode;
  height?: string;
  parentId?: string;
  keyExpr?: string;
  displayExpr?: string;
  loadData?: any;
  onItemClick?: any;
  children?: React.ReactNode;
};

const Wrapper = styled.div.attrs((props: TreeNavProps) => ({
  ...props,
}))`
  min-width: 300;
  background-color: ${(props) => props.theme.colorBgContainer};
  margin-right: 16px;
  overflow: hidden;
  height: ${(props) => props.height};
  border-radius: 8px;
`;
const WrapTree = styled.div.attrs((props: TreeNavProps) => ({
  ...props,
}))`
  overflow: auto;
  height: ${(props) => props?.height};
  padding-right: 6px;
  ::-webkit-scrollbar {
    width: 6px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 100px;
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colorPrimaryBgHover};
  }

  .ant-tree-node-content-wrapper.ant-tree-node-selected,
  .ant-tree-checkbox + span.ant-tree-node-selected {
    background-color: ${(props) => props.theme.colorPrimaryBgHover};
  }
`;
const Number = styled.div`
  line-height: 0;
  display: flex;
  padding: 0 6px;
  background-color: ${(props) => props.theme.colorBorder};
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 19px;
  min-width: 24px;
  height: 24px;
`;

const updateTreeData = (list, key, children) =>
  list.map((node) => {
    if (node.key === key) {
      if (!node.children)
        return {
          ...node,
          children,
        };
      else
        return {
          ...node,
          children: [
            ...node.children.filter((item) => item.type !== 'MORE'),
            ...children,
          ],
        };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

export const TreeNav = ({
  onSearch,
  title,
  loadData,
  height: propHeight = 'fix',
  keyExpr = 'id',
  displayExpr = 'name',
  parentId = 'parentId',
  onItemClick,
  children,
  ...other
}: TreeNavProps) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [dataTree, setDataTree] = useState([]);
  const [heightTree, setHeightTree] = useState('');
  const [height, setHeight] = useState('');
  const size = useSize(document.querySelector('body'));

  useEffect(() => {
    setTimeout(() => {
      let h = 0;
      let h2 = 0;
      const items = document.getElementsByClassName(
        'scroll-caculate-item-treenav',
      );
      const items2 = document.getElementsByClassName('scroll-tree');
      for (let i = 0; i < items.length; i++) {
        h += items[i].clientHeight;
        h2 += items[i].clientHeight;
      }
      for (let i = 0; i < items2.length; i++) {
        h2 += items2[i].clientHeight;
      }
      if (propHeight === 'fix') {
        setHeightTree(`calc(100vh - ${h2 + 20}px)`);
        setHeight(`calc(100vh - ${h + 20}px)`);
      } else {
        setHeight(propHeight);
        setHeightTree(`calc(${propHeight} - ${h + 20}px)`);
      }
    }, 200);
  }, [size?.width, propHeight]);

  useEffect(() => {
    const fetchDataGroupUser = () => {
      setLoading(true);
      loadData()
        .then((res) => {
          setDataTree(res?.data.map((i) => ({ ...i, name: i[displayExpr] })));
        })
        .finally(() => setLoading(false));
    };
    !children && fetchDataGroupUser();
  }, [children]);

  const treeData =
    (dataTree &&
      listToTree(
        dataTree?.map((o) => ({
          ...o,
          key: o[keyExpr],
        })),
      )) ||
    [];
  const itemAllGroup = dataTree?.find((o) => !o.parentId);

  const defaultProps = {
    blockNode: true,
    style: {
      width: '100%',
    },
  };
  const mergeProps = {
    ...defaultProps,
    ...other,
  };

  return (
    <Spin spinning={loading} tip="Loading ...">
      <Wrapper height={height}>
        <div
          className="scroll-tree"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            gap: 10,
          }}
        >
          {typeof title === 'string' ? (
            <Typography.Title level={4} ellipsis>
              {title}
            </Typography.Title>
          ) : (
            title
          )}

          {onSearch && (
            <Input.Search placeholder={t('form.search')} onChange={onSearch} />
          )}
        </div>

        <WrapTree height={heightTree}>
          {children ? (
            children
          ) : (
            <Tree
              treeData={treeData}
              defaultExpandedKeys={[itemAllGroup?.id || '']}
              titleRender={(nodeData) => (
                <div
                  id={nodeData.id}
                  onClick={() => onItemClick(nodeData)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 6,
                    paddingRight: 6,
                    borderRadius: 4,
                  }}
                >
                  <div id={nodeData.id} className="item-tree-view-text">
                    {nodeData.name}
                  </div>
                  {nodeData?.children?.length > 0 && (
                    <Number>{nodeData?.children?.length}</Number>
                  )}
                </div>
              )}
              {...mergeProps}
            />
          )}
        </WrapTree>

        {loading && !itemAllGroup && <Skeleton />}
      </Wrapper>
    </Spin>
  );
};
const limitConfig = 50;
export const AreaTree = (props) => {
  const { onSelect, params, screenType } = props;
  const API = {
    area: AREAS.list,
    floc: FLOC_API.SEARCH,
    block: BLOCK.filter,
    floor: FLOOR.filter,
    unit: UNIT.filter,
  };
  switch (screenType) {
    case 'CAMERA_AI':
      API.block = CAMERA_AI.block;
      API.floor = CAMERA_AI.floor;
      API.unit = CAMERA_AI.unit;
      API.floc = CAMERA_AI.floc;
      break;

    default:
      break;
  }
  const treeRef = useRef(null);
  const [smcArea, setSmcArea] = useState(params?.areaId || null);
  const [paramsSearch, setParamSearch] = useState({
    page: 1,
    keyword: '',
    limit: 50,
  });
  const [tab, setTab] = useState('area');
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (params?.areaId) {
      let selectedKey = params?.areaId?.id;
      if (params?.unitId) selectedKey = params?.unitId?.id;
      else if (params?.floorId) selectedKey = params?.floorId?.id;
      else if (params?.blockId) selectedKey = params?.blockId?.id;
      else if (params?.flocId) {
        setTab('floc');
        selectedKey = params?.flocId?.id;
      } else selectedKey = params?.areaId?.id;
      treeRef.current?.setUncontrolledState({
        selectedKeys: [selectedKey],
        // expandedKeys: [selectedKey],
      });

      if (params?.areaId && !isEqual(params?.areaId, smcArea)) {
        setSmcArea(params?.areaId);
      }
    }
  }, [params]);

  useEffect(() => {
    const setInitTree = async (area) => {
      if (tab === 'area') {
        await setTreeData([
          {
            ...area,
            selected: true,
            key: area.id,
            type: 'AREA',
            title: (
              <div
              // onClick={() => onItemClick({ ...area, type: 'AREA' })}
              >{`Tất cả`}</div>
            ),
          },
        ]);
      } else {
        await setTreeData([
          {
            ...area,
            selected: true,
            key: area.id,
            type: 'FLOC',
            title: (
              <div
              // onClick={() => onItemClick({ ...area, type: 'AREA' })}
              >{`Tất cả`}</div>
            ),
          },
        ]);
        // treeRef.current?.setExpandedKeys([]);
      }
    };
    if (smcArea) {
      setInitTree(smcArea);
    } else setTreeData([]);

    return () => {
      treeRef.current?.setExpandedKeys([]);
      treeRef.current?.setUncontrolledState({ loadedKeys: [] });
    };
  }, [smcArea, tab, paramsSearch.keyword]);

  const onLoadData = useCallback(
    (treeNode: any) => {
      const { key, children, type, page = 1 } = treeNode;
      return new Promise<void>((resolve, reject) => {
        if (children) {
          resolve();
          return;
        }
        switch (type) {
          case 'FLOC':
            setLoading(true);
            axiosGet(`${API.floc}`, {
              areaCode: treeNode?.plantId,
              keyword: paramsSearch.keyword,
              page,
              limit: limitConfig,
            })
              .then((result) => {
                const newData =
                  result?.data?.rows?.map((i) => ({
                    ...i,
                    key: i.id,
                    title: i.name || i.pathName,
                    isLeaf: true,
                    type: 'FLOC_CHILD',
                  })) || [];

                setTreeData((origin) =>
                  updateTreeData(origin, key, [...newData]),
                );
                resolve();
              })
              .catch((err) => reject(err.message))
              .finally(() => setLoading(false));

            break;
          case 'AREA':
            setLoading(true);
            axiosPost(
              `${API.block}`,
              {
                smcAreaIds: [key],
              },
              {
                params: {
                  page,
                  limit: limitConfig,
                  keyword: paramsSearch.keyword,
                },
              },
            )
              .then((result) => {
                const newData =
                  result?.data?.rows?.map((i) => ({
                    ...i,
                    key: i.id,
                    title: i.blockName,
                    type: 'BLOCK',
                  })) || [];
                const totalPage = result?.data?.totalPage;
                if (page < totalPage)
                  newData.push({
                    title: (
                      <Button
                        type="link"
                        style={{ padding: 0, color: 'blue' }}
                        onClick={() =>
                          onLoadData({
                            key,
                            children,
                            type: 'AREA',
                            page: page + 1,
                          })
                        }
                      >
                        Xem thêm
                      </Button>
                    ),
                    type: 'MORE',
                    isLeaf: true,
                  });
                setTreeData((origin) =>
                  updateTreeData(origin, key, [...newData]),
                );
                resolve();
              })
              .catch((err) => reject(err.message))
              .finally(() => setLoading(false));

            break;
          case 'BLOCK':
            axiosPost(
              `${API.floor}`,
              {
                smcBlockIds: [key],
              },
              {
                params: {
                  page,
                  limit: limitConfig,
                },
              },
            )
              .then((result) => {
                const newData =
                  result?.data?.rows?.map((i) => ({
                    ...i,
                    key: i.id,
                    title: i.floorName,
                    type: 'FLOOR',
                  })) || [];
                const totalPage = result?.data?.totalPage;
                if (page < totalPage)
                  newData.push({
                    title: (
                      <Button
                        type="link"
                        style={{ padding: 0, color: 'blue' }}
                        onClick={() =>
                          onLoadData({
                            key,
                            children,
                            type: 'BLOCK',
                            page: page + 1,
                          })
                        }
                      >
                        Xem thêm
                      </Button>
                    ),
                    type: 'MORE',
                    isLeaf: true,
                  });
                setTreeData((origin) =>
                  updateTreeData(origin, key, [...newData]),
                );
                resolve();
              })
              .catch((err) => reject(err.message));
            break;
          case 'FLOOR':
            axiosPost(
              `${API.unit}`,
              {
                smcFloorIds: [key],
              },
              {
                params: {
                  page,
                  limit: limitConfig,
                  // keyword,
                },
              },
            )
              .then((result) => {
                const newData =
                  result?.data?.rows?.map((i) => ({
                    ...i,
                    key: i.id,
                    title: i.unitName,
                    type: 'UNIT',
                    isLeaf: true,
                  })) || [];
                const totalPage = result?.data?.totalPage;
                if (page < totalPage)
                  newData.push({
                    title: (
                      <Button
                        type="link"
                        style={{ padding: 0, color: 'blue' }}
                        onClick={() =>
                          onLoadData({
                            key,
                            children,
                            type: 'FLOOR',
                            page: page + 1,
                          })
                        }
                      >
                        Xem thêm
                      </Button>
                    ),
                    type: 'MORE',
                    isLeaf: true,
                  });
                setTreeData((origin) =>
                  updateTreeData(origin, key, [...newData]),
                );
                resolve();
              })
              .catch((err) => reject(err.message));
            break;

          default:
            break;
        }
      });
    },
    [paramsSearch],
  );

  const debounceFn = useDebounceLodash((inputValue) => {
    setParamSearch({ ...paramsSearch, page: 1, keyword: inputValue });
  }, 500);
  const handleEasySearch = (event) => {
    debounceFn(event.target.value.trim());
  };

  return (
    <TreeNav
      title={
        <FlexCol>
          <VAutocomplete
            allowClear
            value={smcArea}
            onChange={(val) => {
              setSmcArea(val);
              if (val)
                onSelect({
                  info: { node: { ...val, type: 'AREA' }, selected: true },
                });
              else onSelect({ info: { node: val, selected: false } });
            }}
            placeholder="Chọn khu đô thị"
            keyExpr="id"
            displayExpr="areaName"
            loadData={({ page, keyword }) =>
              new Promise((resolve, reject) => {
                axiosGet(`${API.area}`, {
                  page,
                  limit: limitConfig,
                  keyword,
                })
                  .then((result) => {
                    const newData = result?.data?.rows || [];
                    resolve({
                      data: newData,
                      totalCount: result?.data?.count,
                    });
                  })
                  .catch((err) => reject(err.message));
              })
            }
            loadOnMount={false}
            paging
            // others
            onFocus={undefined}
            onBlur={undefined}
            style={undefined}
            filterOption={undefined}
            disableExpr={undefined}
          />
          <Divider style={{ margin: '12px 0' }} />
          <Radio.Group
            style={{ display: 'flex' }}
            css={`
              & .ant-radio-button-wrapper {
                height: auto;
                padding: 0 5px;
              }
              ${breakpoint('xxl')(`
                & .titleTab  {
                  font-size: calc(12/1560*100vw);
                }
              `)}
              ${breakpoint('xl')(`
                & .titleTab  {
                  font-size: 12px;
                }
              `)}
            `}
            options={[
              {
                label: (
                  <Tooltip title="Phân khu" className="titleTab">
                    Phân khu
                  </Tooltip>
                ),
                value: 'area',
                style: {
                  width: '50%',
                  textAlign: 'center',
                  display: ' flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // overflow: 'hidden',
                  // textOverflow: 'ellipsis',
                  // whiteSpace: 'nowrap',
                },
              },
              {
                label: (
                  <Tooltip title="Vị trí chức năng" className="titleTab">
                    Vị trí chức năng
                  </Tooltip>
                ),
                value: 'floc',
                style: {
                  width: '50%',
                  textAlign: 'center',
                  display: ' flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // overflow: 'hidden',
                  // textOverflow: 'ellipsis',
                  // whiteSpace: 'nowrap',
                },
              },
            ]}
            onChange={(val) => setTab(val.target?.value)}
            value={tab}
            optionType="button"
            buttonStyle="solid"
          />
        </FlexCol>
      }
      onSearch={handleEasySearch}
    >
      <Spin spinning={loading}>
        <Tree
          css={`
            & .ant-tree-treenode {
              width: 100%;
              .ant-tree-node-content-wrapper {
                width: 100%;
              }
            }
          `}
          onSelect={(selectedKeys, info) =>
            onSelect({ keys: selectedKeys, info, area: smcArea })
          }
          ref={treeRef}
          loadData={onLoadData}
          treeData={treeData}
          titleRender={(nodeData) => (
            <VCenter
              style={{
                justifyContent: 'space-between',
              }}
            >
              <div id={nodeData.id}>{nodeData.title}</div>
              {nodeData?.count > 0 && <Number>{nodeData.count}</Number>}
            </VCenter>
          )}
        />
      </Spin>
    </TreeNav>
  );
};

import React from 'react';
import styled from 'styled-components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MenuOutlined } from '@ant-design/icons';

const backgroundColor = {
  option: '#FFF',
  fixed: 'rgba(246, 246, 246, 1)',
};

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const { item } = props;
  const itemProps = {};
  // if (item.type !== 'option') itemProps = { ...attributes, ...listeners };

  return (
    <div
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        width: '100%',
        height: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px 0 8px',
        borderRadius: 4,
        marginBottom: 8,
        userSelect: 'none',
        cursor: item.type === 'fixed' ? 'default' : 'move',
        backgroundColor: backgroundColor[item.type] || '#F5F5FA',
        border: `${item.type === 'option' ? 0 : 1}px solid #ECECF2`,
        fontWeight: item.type === 'option' ? 500 : 400,
        display: 'flex',
      }}
      ref={item.type === 'fixed' ? undefined : setNodeRef}
      {...(item.type === 'fixed' ? {} : attributes)}
      {...(item.type === 'fixed' ? {} : listeners)}
    >
      <div>{item.title}</div>
      {['fixed', 'option'].includes(item.type) ? <div /> : <MenuOutlined />}
    </div>
  );
};

export default SortableItem;

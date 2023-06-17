import { MenuOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const { item, sortable = true } = props;
  let itemProps = {};
  if (sortable) itemProps = { ...attributes, ...listeners };
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
        cursor: 'move',
        backgroundColor: item.type === 'option' ? '#FFF' : '#F5F5FA',
        border: `${item.type === 'option' ? 0 : 1}px solid #ECECF2`,
        fontWeight: item.type === 'option' ? 500 : 400,
        display: 'flex',
      }}
      ref={setNodeRef}
      {...itemProps}
    >
      <div>{item.title}</div>
      {item.type === 'option' || !sortable ? <div /> : <MenuOutlined />}
    </div>
  );
};

export default SortableItem;

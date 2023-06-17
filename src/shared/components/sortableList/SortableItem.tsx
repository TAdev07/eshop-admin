import React, { createContext, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { HolderOutlined } from '@ant-design/icons';
import type { CSSProperties, PropsWithChildren } from 'react';
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItemStyled = styled.li`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-grow: 1;
  background-color: #fff;
  box-shadow: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
    0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15);
  border-radius: calc(4px / var(--scale-x, 1));
  box-sizing: border-box;
  list-style: none;
  color: #333;
  font-weight: 400;
  font-size: 1rem;
  font-family: sans-serif;
`;

const DragHandleButton = styled.button`
  display: flex;
  width: 12px;
  height: 100%;
  padding: 15px;
  align-items: center;
  justify-content: center;
  flex: 0 1 auto;
  touch-action: none;
  border: none;
  cursor: move;
  /* cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab; */
  outline: none;
  appearance: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  &:focus-visible {
    box-shadow: 0 0px 0px 2px #4c9ffe;
  }
  &.active {
    cursor: grabbing;
    /* cursor: -moz-grabbing;
    cursor: -webkit-grabbing; */
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  svg {
    flex: 0 0 auto;
    margin: auto;
    height: 100%;
    overflow: visible;
    fill: #919eab;
  }
`;

type Props = {
  id: UniqueIdentifier;
  className?: string;
};

type Context = {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
};

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem({
  children,
  id,
  className,
}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <SortableItemStyled
        className={`SortableItem ${className}`}
        ref={setNodeRef}
        style={style}
      >
        {children}
      </SortableItemStyled>
    </SortableItemContext.Provider>
  );
}

export function DragHandle({
  children,
  className,
}: {
  children?: React.FC;
  className?: string;
}) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <div>
      <DragHandleButton
        className={`DragHandle ${attributes['aria-pressed'] ? 'active' : ''} ${
          className || ''
        }`}
        {...attributes}
        {...listeners}
        ref={ref}
      >
        {children ? children : <HolderOutlined />}
      </DragHandleButton>
    </div>
  );
}

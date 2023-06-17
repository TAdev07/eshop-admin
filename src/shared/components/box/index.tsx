import React, { CSSProperties } from 'react';
import styled from 'styled-components';

type BoxProps = {
  display?: CSSProperties['display'];

  justify?: CSSProperties['justifyContent'];
  items?: CSSProperties['alignItems'];
  direction?: CSSProperties['flexDirection'];
  flex?: string | number;
  gap?: string;

  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingX?: string;
  paddingY?: string;

  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginX?: string;
  marginY?: string;

  height?: string;
  width?: string;

  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  bgColor?: string;

  borderRadius?: string;
  border?: string;
  borderWidth?: string;
  children?: React.ReactNode;

  position?: CSSProperties['position'];
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex?: number;

  cursor?: CSSProperties['cursor'];
};

export const Box: React.FC<BoxProps> = styled.div`
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
  padding-top: ${(props) => props.paddingTop || props.paddingY};
  padding-bottom: ${(props) => props.paddingBottom || props.paddingY};
  padding-left: ${(props) => props.paddingLeft || props.paddingX};
  padding-right: ${(props) => props.paddingRight || props.paddingX};

  margin: ${(props) => props.margin};
  margin-top: ${(props) => props.marginTop || props.marginY};
  margin-bottom: ${(props) => props.marginBottom || props.marginY};
  margin-left: ${(props) => props.marginLeft || props.marginX};
  margin-right: ${(props) => props.marginRight || props.marginX};

  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.items};
  flex-direction: ${(props) => props.direction};
  flex: ${(props) => props.flex};
  gap: ${(props) => props.gap};

  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  border: ${(props) => props.border};
  border-width: ${(props) => props.borderWidth};
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};

  cursor: ${(props) => props.cursor};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  z-index: ${(props) => props.zIndex};
`;

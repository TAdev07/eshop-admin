import React, { CSSProperties } from 'react';
import styled from 'styled-components';

type BoxProps = {
  display?: CSSProperties['display'];

  justify?: CSSProperties['justifyContent'];
  items?: CSSProperties['alignItems'];
  direction?: CSSProperties['flexDirection'];
  gap?: string | number;
  flex?: string | number;

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
  bgColor?: string;

  borderRadius?: string;
  children?: React.ReactNode;
  className?: string;
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
  gap: ${(props) => props.gap};
  flex: ${(props) => props.flex};

  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.bgColor};
`;

import React from 'react';
type IconProps = {
  children?: any
  src?: any
  alt?: any
}
export const Icon = (props: IconProps) => {
  return <img style={{ width: 20, height: 20 }} src={props?.children || props?.src} alt={props?.alt || 'icon'} />;
}

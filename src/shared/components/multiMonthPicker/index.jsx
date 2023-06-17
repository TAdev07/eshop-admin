import React from "react";
import { Button as BaseButton } from "antd";


export const MultiMonthPicker = ({disabled, style, href, children, icon, htmlType, loading, ...rest }) => {
  return <BaseButton shape="circle"
    {...rest}
    style={{
      ...{
        backgroundColor: 'transparent', border: '0px'
      }, ...style
    }}
  >
    {children}
  </BaseButton>
}

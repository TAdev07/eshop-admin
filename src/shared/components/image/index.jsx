import { Image } from 'antd';
import { useTheme } from 'styled-components';
import styled from 'styled-components';
import { forwardRef } from 'react';
const PlaceHolderImage = styled.img`
  filter: blur(4px);
  -webkit-filter: blur(10px);
  width: 100%;
  height: 100%;
`;
export const Img = forwardRef((props, ref) => {
  const theme = useTheme();
  return (
    <Image
      preview={false}
      fallback={theme?.image?.fallback}
      placeholder={<PlaceHolderImage src={theme?.image?.placeHolder} />}
      {...props}
      ref={ref}
    />
  );
});

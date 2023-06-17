import { useTheme } from 'styled-components';
import PropTypes from 'prop-types';
export default function EmptySpace({ size = 'sizeMD', directon = 'vertical' }) {
  const theme = useTheme();
  return (
    <div
      css={
        directon == 'vertical'
          ? `height:${theme[size]}px; width:100%;`
          : `width:${theme[size]}px; height:100%;`
      }
    ></div>
  );
}

EmptySpace.propTypes = {
  size: PropTypes.string, //ăn theo design token của antd: size,sizeLG,sizeMD,sizeMS,sizeSM,sizeXL,sizeXS,sizeXXL,sizeXXS
  directon: PropTypes.string, // vertical hoặc horizontal
};

import { css } from 'styled-components';

export const breakpoint =
  (size = 'sm') =>
  (inner) => {
    const bp = {
      xs: 'screenXS',
      sm: 'screenSM',
      md: 'screenMD',
      lg: 'screenLG',
      xl: 'screenXL',
      xxl: 'screenXXL',
    };
    return css`
      @media (max-width: ${(props) => props.theme[bp[size]]}px) {
        ${inner}
      }
    `;
  };

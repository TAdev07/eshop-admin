import { common } from './common';
import { merge } from 'lodash';
const extend = {
  onColorPrimary: '#141414',
  colorBgContainer: '#141414',
  colorLink: 'rgba(255, 255, 255, 0.85)',
};
const dark = merge({ ...common }, extend);

export { dark };

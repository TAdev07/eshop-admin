import { common } from './common';
import { merge } from 'lodash';
const extend = {
  colorPrimary: '#0381FE',
  onColorPrimary: '#fff',
  colorLink: 'rgba(0, 0, 0, 0.88)',
};
const light = merge({ ...common }, extend);

export { light };

import { ConfigProvider, theme as antTheme } from 'antd';
const { defaultAlgorithm, darkAlgorithm } = antTheme;
import { dark } from '../dark';
import { light } from '../light';
import { components } from './components';
export const LightProvider = (props) => (
  <ConfigProvider
    {...props}
    theme={{
      algorithm: defaultAlgorithm,
      token: light,
      components,
      hashed: false,
    }}
  />
);

export const DarkProvider = (props) => (
  <ConfigProvider
    {...props}
    theme={{
      algorithm: darkAlgorithm,
      token: dark,
      components,
      hashed: false,
    }}
  />
);

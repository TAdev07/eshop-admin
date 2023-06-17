import React from 'react';

export const Logo = ({ height = '70px' }) => {
  return <img src="/images/logo.svg" alt="logo" style={{ height }} />;
};
export const LogoDark = ({ height = '70px' }) => {
  return <img src="/images/logo_dark.svg" alt="logo" style={{ height }} />;
};

import { PageMenu } from 'shared/components';
import { AuthenticatedHeader } from 'shared/components/header';
import React from 'react';
import styled from 'styled-components';

const AppLayout = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const MainContaner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: auto;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px 28px;
`;

export function AuthenticatedLayout({ children }) {
  return (
    <React.Fragment>
      <AppLayout>
        <PageMenu />
        <MainContaner>
          <AuthenticatedHeader />
          <ContentContainer>{children}</ContentContainer>
          {/* <Footer /> */}
        </MainContaner>
      </AppLayout>
    </React.Fragment>
  );
}

export default AuthenticatedLayout;

import { UnAuthenticatedHeader } from 'shared/components/header';
import styled from 'styled-components';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export function UnAuthenLayout({ children }) {
  return (
    <AppLayout>
      <UnAuthenticatedHeader />
      {children}
    </AppLayout>
  );
}

export default UnAuthenLayout;

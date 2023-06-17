import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${(props) => props.theme.colorBgContainer};
`;

export const Flex = styled.div`
  display: flex;
`;
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HCenter = styled.div`
  display: flex;
  justify-content: center;
`;
export const VCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const Spacer = styled.div`
  flex-grow: 1;
`;

export const ScrollArea = styled.div`
  overflow: auto;
  ::-webkit-scrollbar,
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
  }
  :hover::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colorPrimaryBgHover};
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;

export const Paper = styled.div`
  background-color: ${(props) => props.theme.colorBgContainer};
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colorBorderSecondary};
  box-shadow: ${(props) => props.theme.boxShadow};
`;

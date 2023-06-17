import Text from 'antd/lib/typography/Text';
import { Img } from 'shared/components/image';
import styled from 'styled-components';
const Container = styled.div`
  height: 100%;
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #fff;
`;
export const NoData = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <Img src="/nodata.svg" alt="" />
      <Text
        css={`
          color: #fff;
          font-size: 16px;
        `}
      >
        Không có dữ liệu
      </Text>
    </Container>
  );
};

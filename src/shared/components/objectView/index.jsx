import { Fragment } from "react";

// import { Logo } from "components";
import styled from 'styled-components';
const Container = styled.div`
  background-color: #0b2e50;
  color: #fff;
  font-size: 14px;
  padding: 12px;
  & > div{
    display: flex;
    gap: 16px;
    > div{
      min-width: 10px;
    }
  }
`;
export const ObjectView = ({ data, ...rest }) => {
  //view objecy key - data under table mode
  return (
    <Container {...rest}>
      {
        data?.map(item => {
          let keys = Object.keys(item)
          return <Fragment>
            <div>
              <div>{keys[0]}:</div>
              <div>{item[keys[0]]}</div>
            </div>
            <div>
              <div>{keys[1]}:</div>
              <div>{item[keys[1]]}</div>
            </div>
          </Fragment>
        })
      }
    </Container>
  );
};

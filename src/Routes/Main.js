import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
`;

const IconWrapper = styled.div`
    width:100%:
    height:100%;
    background-color:${props => props.theme.grayColor1};
    border:1px solid black;
`;

const Icon = styled.div`
  height: 300px;
  width: 300px;
  margin: 20px;
  border: 1px solid black;
`;

export default () => (
  <Wrapper>
    <Box>
      <IconWrapper>
        <Icon />
        <Icon />
        <Icon />
        <Icon />
      </IconWrapper>
    </Box>
  </Wrapper>
);

import React from "react";
import styled from "styled-components";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";

const AllContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
const BulletinContainer2 = styled.div`
  ${props => props.theme.whiteBox}
  width: 650px;
  height: 80vh;
  display: flex;

  align-items: center;
  justify-content: center;
  overflow-y: auto;
  margin-left: 20px;
  a {
    color: inherit;
  }
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    margin: 0;
  }
`;

export default () => (
  <AllContainer>
    <BulletinContainer2>게시글을 클릭해주세요.</BulletinContainer2>
  </AllContainer>
);

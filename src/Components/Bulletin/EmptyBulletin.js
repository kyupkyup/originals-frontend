import React from "react";
import styled from "styled-components";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";
import Loader from "../Loader";
import PropTypes from "prop-types";
const AllContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    display: none;
  }
`;
const BulletinContainer2 = styled.div`
  ${props => props.theme.whiteBox}
  width: 600px;
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

const EmptyBulletin = ({ loading }) => {
  return (
    <AllContainer>
      <BulletinContainer2>
        {loading ? <Loader /> : "게시글을 클릭해주세요."}
      </BulletinContainer2>
    </AllContainer>
  );
};

export default EmptyBulletin;

EmptyBulletin.propTypes = {
  loading: PropTypes.bool
};

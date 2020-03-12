import React from "react";
import styled, { keyframes } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import { Ref } from "semantic-ui-react";
import { BREAK_POINT_MOBILE } from "../utils/mediaQuery";

const Animation = keyframes`
    0%{
        opacity:1
    }
    3%{
        opacity:0.3
    }
    100%{
        opacity:0.3
    }
`;
const Header = styled.header`
  width: 100%;
  background-color: white;
  border: 0;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  padding: 25px 0;
  z-index: 2;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    padding: 15px 5px;
    font-size: 10pt;
    margin-bottom: 10px;
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;
const HeaderColumn = styled.div`
  color: ${props => props.theme.blueColor};

  width: 50%;
  text-align: center;
  &:first-child {
    text-align: left;
    margin-right: auto;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;
const HeaderLink = styled(Link)`
  color: ${props => props.theme.blueColor};
  font-weight: 600;
  &:hover {
    text-decoration: none;
    animation: ${Animation} 10s linear infinite;
  }
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(() => {
  const { data, loading } = useQuery(ME);

  console.log(data);
  if (data && data.me) {
    return (
      <Header>
        <HeaderWrapper>
          <HeaderColumn>
            <HeaderLink to="/">Originals</HeaderLink>
          </HeaderColumn>
          <HeaderColumn>
            {!loading && data && data.me ? (
              <HeaderLink to={`/Bulletin/${data.me.id}`}>게시판</HeaderLink>
            ) : (
              <HeaderLink to={`/Bulletin/`}>게시판</HeaderLink>
            )}
            {!loading && data && data.me ? (
              <HeaderLink to={`/Meeting/${data.me.id}`}>모임</HeaderLink>
            ) : (
              <HeaderLink to={`/Meeting/`}>모임</HeaderLink>
            )}
            {!loading && data && data.me ? (
              <HeaderLink to={`/Profile/${data.me.email}`}>프로필</HeaderLink>
            ) : (
              <HeaderLink to="/Profile">프로필</HeaderLink>
            )}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
    );
  } else {
    return null;
  }
});

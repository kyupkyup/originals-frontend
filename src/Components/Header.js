import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Profile, Bulletin, Book, Meeting } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";

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
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;
const HeaderColumn = styled.div`
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
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(() => {
  const { data, loading } = useQuery(ME);
  console.log(data);

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">Originals</Link>
        </HeaderColumn>
        <HeaderColumn>
          {!loading && data && data.me ? (
            <HeaderLink to={`/Bulletin/${data.me.id}`}>게시판</HeaderLink>
          ) : null}
          <HeaderLink to="/Meeting">모임</HeaderLink>
          {/* <HeaderLink to="/Book">도서</HeaderLink> */}
          {!loading && data && data.me ? (
            <HeaderLink to={`/Profile/${data.me.email}`}>프로필</HeaderLink>
          ) : (
            <HeaderLink to="/Profile">프로필</HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});

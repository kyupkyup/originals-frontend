import React from "react";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import Button from "../../Components/Button/Button";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  min-height: 100vh;
  align-items: center;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 100px;
`;
const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    align-self: top;
  }
`;
const UsernameRow = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
  align-itmes: center;
`;
const UserName = styled(FatText)`
  font-size: 20pt;
  text-align: center;
  width: 300px;
  padding: 30px;
`;
const ButtonContainer = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProfileButton = styled(Button)`
  width: 100%;
`;
const ProfileContainer = styled.div`
  width:100%:
  height:200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding:40px;
  padding-left:110px;
`;

const ProfileInfo = styled(FatText)`
  height: 30px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  margin: 20px;
  font-weight: 700;
`;
export default ({ loading, data, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeProfile) {
    const {
      seeProfile: {
        id,
        avatar,
        userName,
        birthday,
        phoneNum,
        email,
        classes,
        posts,
        postsCount,
        comments,
        commentsCount,
        reservations,
        reservationsCount,
        likes,
        likesCount,
        participants,
        participantsCount,
        isSelf,
        createdAt
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{userName} | Originals</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size={"lg"} url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <UserName text={userName} />
              {isSelf ? (
                <ButtonContainer>
                  <ProfileButton onClick={logOut} text={"로그아웃"} />
                  <ProfileButton onClick={logOut} text={"계정 수정"} />
                </ButtonContainer>
              ) : null}
            </UsernameRow>
            {isSelf ? (
              <ProfileContainer>
                <ProfileInfo text={"이메일 : " + email} />
                <ProfileInfo text={"생일 : " + birthday} />
                <ProfileInfo text={"핸드폰번호 : " + phoneNum} />
                {classes === 1 ? (
                  <ProfileInfo text={"회원구분 : 신입회원"} />
                ) : classes === 2 ? (
                  <ProfileInfo text={"회원구분 : 일반회원"} />
                ) : (
                  <ProfileInfo text={"회원구분 : 정회원"} />
                )}
              </ProfileContainer>
            ) : null}
            {/* isSelf 일 경우 이메일, 생일 폰번, 등 표시 */}
            {/* 회원구분 표시 */}
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> 게시글
              </Count>
              <Count>
                <FatText text={String(postsCount)} /> 댓글
              </Count>
              <Count>
                <FatText text={String(postsCount)} /> 모임 참가
              </Count>
              <Count>
                <FatText text={String(postsCount)} /> 도서 대여
              </Count>
            </Counts>
          </HeaderColumn>
        </Header>
        <div>내용</div>
      </Wrapper>
    );
  } else {
    return null;
  }
};

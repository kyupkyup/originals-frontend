import React from "react";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import Button from "../../Components/Button/Button";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader";
import BulletinLine from "../../Components/BulletinLine";
import CommentLine from "../../Components/CommentLine";
import MeetingLine from "../../Components/MeetingLine";
import EditProfile from "../../Components/EditProfile";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";

const Wrapper = styled.div`
  min-height: 80vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${props => props.size}
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10pt;
  }
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 100px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10pt;
  }
`;
const HeaderColumn = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    align-self: top;
  }
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
  }
`;
const AvatarM = styled(Avatar)`
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    ${props => (props.size = "md")}
    margin-bottom: 10px;
  }
`;
const UsernameRow = styled.div`
  display: flex;
  height: 100px;
  justify-content: center;
  align-itmes: center;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;
const UserName = styled(FatText)`
  font-size: 20pt;
  text-align: center;
  width: 300px;
  padding: 30px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    padding: 10px;
  }
`;
const WholeButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10px;

  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    padding: 5px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const ProfileButton = styled(Button)`
  width: 100%;

  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
  }
`;
const ProfileContainer = styled.div`
  width:100%:
  height:200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding:40px;
  padding-left:110px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width:100%;
    margin-top:10px;
    padding:10px;
  }
`;
const ProfileTextContainer = styled.div`
  margin-bottom: 20px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    margin-bottom: 5px;
    text-align: center;
  }
`;

const ProfileInfo = styled(FatText)`
  height: 30px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 11pt;
  }
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    margin: 5px;
    width: 100%;
    text-align: center;
  }
`;

const Count = styled.li`
  font-size: 16px;
  margin: 20px;
  font-weight: 700;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 10pt;
    margin: 20px;
  }
`;

const MainContainer = styled.div`
  width: 800px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 60px;
  align-items: center;
  border-top: 0.5px solid ${props => props.theme.lightGray3};
  border-bottom: 0.5px solid ${props => props.theme.lightGray3};
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    height: 40px;
  }
`;
const Tab = styled.span`
  cursor: pointer;
  width: 250px;
  text-align: center;
  &:hover {
    font-weight: 700;
  }
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 33%;
  }
`;

const ContentContainer = styled.div`
  height: 600px;
`;

export default ({
  loading,
  data,
  logOut,
  action,
  setAction,
  editAction,
  editProfile
}) => {
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
    if (editAction === "Profile") {
      return (
        <Wrapper>
          <Helmet>
            <title>{userName} | Originals</title>
          </Helmet>
          <Header>
            <HeaderColumn>
              <AvatarM size={"lg"} url={avatar} />
            </HeaderColumn>
            <HeaderColumn>
              <UsernameRow>
                <UserName text={userName} />

                {isSelf ? (
                  <WholeButtonContainer>
                    <ButtonContainer>
                      <ProfileButton
                        onClick={() => editProfile("Edit")}
                        text={"계정 수정"}
                      />
                    </ButtonContainer>

                    <ButtonContainer>
                      <ProfileButton onClick={logOut} text={"로그아웃"} />
                    </ButtonContainer>
                  </WholeButtonContainer>
                ) : null}
              </UsernameRow>

              <ProfileContainer>
                {isSelf ? (
                  <>
                    <ProfileTextContainer>
                      <ProfileInfo text={"이메일 : " + email} />
                    </ProfileTextContainer>
                    <ProfileTextContainer>
                      <ProfileInfo text={"생일 : " + birthday} />
                    </ProfileTextContainer>
                    <ProfileTextContainer>
                      <ProfileInfo text={"핸드폰번호 : " + phoneNum} />
                    </ProfileTextContainer>
                  </>
                ) : null}
                <ProfileTextContainer>
                  {classes === 1 ? (
                    <ProfileInfo text={"신입회원"} />
                  ) : classes === 2 ? (
                    <ProfileInfo text={"일반회원"} />
                  ) : (
                    <ProfileInfo text={"정회원"} />
                  )}
                </ProfileTextContainer>
              </ProfileContainer>

              {/* isSelf 일 경우 이메일, 생일 폰번, 등 표시 */}
              {/* 회원구분 표시 */}
              <Counts>
                <Count>
                  <FatText text={String(postsCount)} /> 게시글
                </Count>
                <Count>
                  <FatText text={String(commentsCount)} /> 댓글
                </Count>
                <Count>
                  <FatText text={String(participantsCount)} /> 모임 참가
                </Count>
                {/* <Count>
                <FatText text={String(postsCount)} /> 도서 대여
              </Count> */}
              </Counts>
            </HeaderColumn>
          </Header>
          <MainContainer>
            <TabContainer>
              <Tab onClick={() => setAction("bulletin")}>게시글</Tab>
              <Tab onClick={() => setAction("comment")}>댓글</Tab>
              <Tab onClick={() => setAction("meeting")}>참가한 모임</Tab>
            </TabContainer>
            <ContentContainer>
              {action === "bulletin"
                ? posts.map(post => <BulletinLine key={post.id} post={post} />)
                : action === "comment"
                ? comments.map(comment => (
                    <CommentLine key={comment.id} comment={comment} />
                  ))
                : participants.map(participant => (
                    <MeetingLine
                      key={participant.id}
                      participant={participant}
                    />
                  ))}
            </ContentContainer>
          </MainContainer>
        </Wrapper>
      );
    } else if (editAction === "Edit") {
      return <EditProfile id={id} editProfile={editProfile} logOut={logOut} />;
    }
  } else {
    return null;
  }
};

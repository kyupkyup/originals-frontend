import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../Components/Bulletin";
import Meeting from "../Components/Meeting";
import Loader from "../Components/Loader";
import { BREAK_POINT_MOBILE } from "../utils/mediaQuery";

const MAIN_POST = gql`
  {
    mainPost {
      id
    }
  }
`;

const MAIN_MEETING = gql`
  {
    mainMeeting {
      id
      title
      main
      user {
        id
        avatar
        userName
        classes
        email
      }
      meetingTime
      meetingPlace
      meetingPrice
      deadline
      meetingHeadCounts
      participants {
        id
        user {
          id
          userName
          avatar
          classes
          email
        }
      }
      isParticipated
      participantsCount
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    font-size: 10pt;
  }
`;

const Box = styled.div`
  border-radius: 0px;
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 20px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    font-size: 10pt;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PostWrapper = styled.div`
    width: 650px:
    height:100%;
    background-color:${props => props.theme.grayColor1};
    @media (max-width: ${BREAK_POINT_MOBILE}px) {
      width:100%;
    }
`;

const MeetingWrapper = styled.div`
    width:800px:
    height:100%;
    background-color:${props => props.theme.grayColor1};
    @media (max-width: ${BREAK_POINT_MOBILE}px) {
      width:100%;
    }
`;

export default () => {
  const { data: dataPost, loading: loadingPost } = useQuery(MAIN_POST);
  const { data: dataMeeting, loading: loadingMeeting } = useQuery(MAIN_MEETING);

  return (
    <Wrapper>
      <Box>
        <MeetingWrapper>
          {loadingMeeting && <Loader />}

          {!loadingMeeting && dataMeeting && dataMeeting.mainMeeting && (
            <Meeting
              id
              title={dataMeeting.mainMeeting.title}
              main={dataMeeting.mainMeeting.main}
              user={dataMeeting.mainMeeting.user}
              meetingTime={dataMeeting.mainMeeting.meetingTime}
              meetingPlace={dataMeeting.mainMeeting.meetingPlace}
              meetingPrice={dataMeeting.mainMeeting.meetingPrice}
              deadline={dataMeeting.mainMeeting.deadline}
              meetingHeadCounts={dataMeeting.mainMeeting.meetingHeadCounts}
              participants={dataMeeting.mainMeeting.participants}
              isParticipated={dataMeeting.mainMeeting.isParticipated}
              participantsCount={dataMeeting.mainMeeting.participantsCount}
              createdAt={dataMeeting.mainMeeting.createdAt}
            />
          )}
        </MeetingWrapper>
      </Box>
      <Box>
        <PostWrapper>
          {loadingPost && <Loader />}
          {!loadingPost && dataPost && dataPost.mainPost && (
            <Post postId={dataPost.mainPost.id} setAction={"Main"} />
          )}
        </PostWrapper>
      </Box>
    </Wrapper>
  );
};

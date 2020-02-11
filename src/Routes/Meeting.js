import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Helmet from "react-helmet";
import Loader from "../Components/Loader";
import Meeting from "../Components/Meeting";
const SHOW_MEETING_LIST = gql`
  {
    showMeetingList {
      id
      title
      main
      user {
        id
        avatar
        userName
        classes
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
        }
      }
      isParticipated
      participantsCount
      createdAt
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;
export default () => {
  const { data, loading } = useQuery(SHOW_MEETING_LIST);
  return (
    <Wrapper>
      <Helmet>
        <title>모임 | Originals</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.showMeetingList &&
        data.showMeetingList.map(meeting => (
          <Meeting
            key={meeting.id}
            id={meeting.id}
            title={meeting.title}
            main={meeting.main}
            user={meeting.user}
            meetingTime={meeting.meetingTime}
            meetingPlace={meeting.meetingPlace}
            meetingPrice={meeting.meetingPrice}
            deadline={meeting.deadline}
            meetingHeadCounts={meeting.meetingHeadCounts}
            participants={meeting.participants}
            isParticipated={meeting.isParticipated}
            participantsCount={meeting.participantsCount}
            createdAt={meeting.createdAt}
          />
        ))}
    </Wrapper>
  );
};

import React, { useState } from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";

import Helmet from "react-helmet";
import Loader from "../Components/Loader";
import Meeting from "../Components/Meeting";
import Button from "../Components/Button/Button";
import EditMeeting from "../Components/EditMeeting";
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 100px;
  width: 100%;
`;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;
const ButtonDownContainer = styled.span`
  width: 150px;
  height: 50px;
  margin: 5px;
`;
export default withRouter(
  ({
    match: {
      params: { id }
    }
  }) => {
    const { refetch, data, loading } = useQuery(SHOW_MEETING_LIST);
    const [edit, setEdit] = useState("read");
    const [editId, setEditId] = useState("");

    const setEditing = async editId2 => {
      await setEditId(editId2);
      await setEdit("edit");
    };
    return (
      <Wrapper>
        <Helmet>
          <title>모임 | Originals</title>
        </Helmet>
        {edit === "read" && (
          <ButtonContainer>
            <ButtonDownContainer>
              <Button text={"모임 만들기"} onClick={() => setEdit("write")} />
            </ButtonDownContainer>
          </ButtonContainer>
        )}

        {edit === "read" && loading && <Loader />}
        {edit === "read" &&
          !loading &&
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
              userId={id}
              setEditing={setEditing}
            />
          ))}

        {edit === "write" ? (
          <EditMeeting
            meetingId={"write"}
            refetch={refetch}
            setEdit={setEdit}
          />
        ) : null}
        {edit === "edit" ? (
          <EditMeeting meetingId={editId} refetch={refetch} setEdit={setEdit} />
        ) : null}
      </Wrapper>
    );
  }
);

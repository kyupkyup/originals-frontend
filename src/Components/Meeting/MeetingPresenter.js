import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import DropdownButton from "../Button/DropdownButton";
import Participants from "../Participants";
import Button from "../Button/Button";
import DisabledButton from "../Button/DisabledButton";
const MeetingContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  height: auto;
  border: 3px solid ${props => props.theme.lightGray1};
  padding: 20px;
  margin-bottom: 20px;
`;
const Header = styled.div`
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-itmes: center;
  height: 150px;
  border: 2px solid ${props => props.theme.lightGray3};
  margin-bottom: 10px;
`;
const Title = styled.div`
  padding: 10px;
  width: 100%;
`;
const User = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  a {
    color: inherit;
  }
`;
const Classes = styled.span`
  margin-left: 10px;
`;
const MainContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const MeetingTime = styled.div`
  margin-bottom: 10px;
  font-size: 10pt;

  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
`;
const MeetingPlace = styled.div`
  font-size: 10pt;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
`;
const MeetingPrice = styled.div`
  font-size: 10pt;

  margin-bottom: 10px;

  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
`;
const Deadline = styled.div`
  font-size: 10pt;

  margin-bottom: 10px;

  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
`;
const MeetingHeadCounts = styled.div`
  font-size: 10pt;

  margin-bottom: 10px;

  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
`;
const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const Text = styled(FatText)`
  font-size: 13pt;
  margin: 0 20px;
`;

export default ({
  meetingId,
  title,
  main,
  user: { id, avatar, userName, classes, email },
  meetingTime,
  meetingPlace,
  meetingPrice,
  deadline,
  meetingHeadCounts,
  participants,
  isParticipated,
  participantsCount,
  createdAt,
  dropdown,
  clickDrop,
  participate,
  userId,
  setEditing
}) => {
  return (
    <MeetingContainer>
      <Header>
        <Title>
          <FatText text={title} />
        </Title>
        {
          <User>
            <Avatar size="md" url={avatar} />
            <Link to={`/Profile/${email}`}>
              <FatText text={userName} />
            </Link>
            <Classes>
              {classes === 1
                ? "신입회원"
                : classes === 2
                ? "일반회원"
                : "정회원"}
            </Classes>
          </User>
        }
      </Header>
      <MainContainer>
        <MeetingTime>
          <Text text={" 모임 시간 :   "} />
          {meetingTime}
        </MeetingTime>

        <MeetingPlace>
          <Text text={" 모임 장소 :   "} />
          {meetingPlace}
        </MeetingPlace>

        <MeetingPrice>
          <Text text={" 모임 가격 :   "} />
          {meetingPrice}
        </MeetingPrice>

        <Deadline>
          <Text text={" 마감 기간 :   "} />
          {deadline}
        </Deadline>

        <MeetingHeadCounts>
          <Text text={" 제한 인원 :   "} />
          {meetingHeadCounts}
        </MeetingHeadCounts>
      </MainContainer>
      <DropdownButton
        title={title}
        participantsCount={participantsCount}
        onClick={() => clickDrop()}
      />
      {dropdown ? <Participants meetingId={meetingId} /> : null}
      <ButtonContainer>
        {participantsCount <= meetingHeadCounts ? (
          <Button text={"참석하기"} onClick={() => participate()} />
        ) : (
          <DisabledButton text={"참석하기"} />
        )}
      </ButtonContainer>
      <ButtonContainer>
        {userId === id ? (
          <Button
            text={"모임 수정하기"}
            onClick={() => {
              setEditing(meetingId);
            }}
          />
        ) : null}
      </ButtonContainer>
    </MeetingContainer>
  );
};

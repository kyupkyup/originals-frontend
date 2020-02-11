import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import DropdownButton from "../Button/DropdownButton";
import Participants from "../Participants";
const MeetingContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  border: 3px solid ${props => props.theme.lightGray1};
  padding: 20px;
  overflow-y: auto;
  margin-bottom: 20px;
`;
const Header = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-itmes: center;
  height: 150px;
  border: 2px solid ${props => props.theme.lightGray3};
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
const Main = styled.div`
  width: 100%;
  padding: 10px;
`;
const MeetingTime = styled.div`
  width: 100%;
  padding: 10px;
`;
const MeetingPlace = styled.div`
  width: 100%;
  padding: 10px;
`;
const MeetingPrice = styled.div`
  width: 100%;
  padding: 10px;
`;
const Deadline = styled.div`
  width: 100%;
  padding: 10px;
`;
const MeetingHeadCounts = styled.div`
  width: 100%;
  padding: 10px;
`;

export default ({
  id,
  title,
  main,
  user: { avatar, userName, classes },
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
  clickDrop
}) => {
  console.log(dropdown);
  return (
    <MeetingContainer>
      <Header>
        <Title>
          <FatText text={title} />
        </Title>
        {
          <User>
            <Avatar size="md" url={avatar} />
            <Link to={`/${userName}`}>
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
        <Main>{main}</Main>
        <MeetingTime>{meetingTime}</MeetingTime>
        <MeetingPlace>{meetingPlace}</MeetingPlace>
        <MeetingPrice>{meetingPrice}</MeetingPrice>
        <Deadline>{deadline}</Deadline>
        <MeetingHeadCounts>{meetingHeadCounts}</MeetingHeadCounts>
      </MainContainer>
      <DropdownButton
        title={title}
        participantsCount={participantsCount}
        onClick={() => clickDrop()}
      />
      {dropdown ? <Participants meetingId={id} /> : null}
    </MeetingContainer>
  );
};

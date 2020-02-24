import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery } from "react-apollo-hooks";
import Loader from "./Loader";
import { gql } from "apollo-boost";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import FatText from "./FatText";

const SEE_PARTICIPANTS_LIST = gql`
  query seeParticipantsList($meetingId: String!) {
    seeParticipantsList(meetingId: $meetingId) {
      id
      user {
        id
        email
        avatar
        userName
        classes
      }
      createdAt
    }
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const Participant = styled.div`
  margin: 5px 20px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 11pt;
  a {
    color: inherit;
  }
`;

const Classes = styled.span`
  margin-left: 10px;
`;

const Participants = ({ meetingId }) => {
  const { data, loading } = useQuery(SEE_PARTICIPANTS_LIST, {
    variables: { meetingId }
  });
  return (
    <Container>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeParticipantsList &&
        data.seeParticipantsList.map(participant => (
          <Participant key={participant.id}>
            <Avatar size="sm" url={participant.user.avatar} className="" />
            <UserColumn>
              <Link to={`/Profile/${participant.user.email}`}>
                <FatText text={participant.user.userName} />
              </Link>
              <Classes>
                {participant.user.classes === 1
                  ? "신입회원"
                  : participant.user.classes === 2
                  ? "일반회원"
                  : "정회원"}
              </Classes>
            </UserColumn>
          </Participant>
        ))}
    </Container>
  );
};

Participants.propTypes = {
  meetingId: PropTypes.string.isRequired
};

export default Participants;

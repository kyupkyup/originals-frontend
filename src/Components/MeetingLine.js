import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "./FatText";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  flex-direction: row;
  border-top: 0.5px solid ${props => props.theme.lightGray3}

  border-bottom: 0.5px solid ${props => props.theme.lightGray3}
  margin-bottom:5px;
`;

const ContainerDivider = styled.div`
  display: flex;
  &:first-child {
    width: 60%;
    text-align: left;
    padding: 10px;
  }
  &:last-child {
    width: 40%;

    padding: 10px;
    text-align: right;
  }
`;

const Title = styled(FatText)`
  padding: 10px;
`;

const MeetingLine = ({ participant }) => {
  return (
    <Container>
      <ContainerDivider>
        <Title text={participant.meeting.title} />
      </ContainerDivider>
      <ContainerDivider>
        <Title text={participant.meeting.meetingTime} />
      </ContainerDivider>
    </Container>
  );
};

MeetingLine.propTypes = {
  participant: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          userName: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          classes: PropTypes.number.isRequired
        })
      ),
      meeting: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          user: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              userName: PropTypes.string.isRequired,
              avatar: PropTypes.string.isRequired,
              classes: PropTypes.number.isRequired
            })
          ),
          meetingTime: PropTypes.string.isRequired
        })
      )
    })
  )
};
export default MeetingLine;

import React, { useState } from "react";
import PropTypes from "prop-types";
import MeetingPresenter from "./MeetingPresenter";

const MeetingContainer = ({
  id,
  title,
  main,
  user,
  meetingTime,
  meetingPlace,
  meetingPrice,
  deadline,
  meetingHeadCounts,
  participants,
  isParticipated,
  participantsCount,
  createdAt
}) => {
  const [dropdown, setDropdown] = useState(false);

  const clickDrop = () => {
    if (dropdown === true) {
      setDropdown(false);
    } else if (dropdown === false) {
      setDropdown(true);
    }
  };

  return (
    <MeetingPresenter
      id={id}
      title={title}
      main={main}
      user={user}
      meetingTime={meetingTime}
      meetingPlace={meetingPlace}
      meetingPrice={meetingPrice}
      deadline={deadline}
      meetingHeadCounts={meetingHeadCounts}
      participants={participants}
      isParticipated={isParticipated}
      participantsCount={participantsCount}
      createdAt={createdAt}
      dropdown={dropdown}
      clickDrop={clickDrop}
    />
  );
};

MeetingContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      classes: PropTypes.string.isRequired
    })
  ),
  meetingTime: PropTypes.string.isRequired,
  meetingPlace: PropTypes.string.isRequired,
  meetingPrice: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  meetingHeadCounts: PropTypes.number.isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          userName: PropTypes.string.isRequired,
          classes: PropTypes.string.isRequired
        })
      )
    })
  ),
  isParticipated: PropTypes.bool,
  participantsCount: PropTypes.number,
  createdAt: PropTypes.string
};

export default MeetingContainer;

import React, { useState } from "react";
import PropTypes from "prop-types";
import MeetingPresenter from "./MeetingPresenter";
import { useMutation } from "react-apollo-hooks";
import { PARTICIPATE } from "./MeetingQueries";
import { toast } from "react-toastify";

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
  coords,
  participants,
  isParticipated,
  participantsCount,
  createdAt,
  userId,
  setEditId,
  setEditing
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [mapAction, setMapAction] = useState(false);
  const translate = coords => {
    coords = coords.replace(/\s/g, "");
    coords = coords.replace(/\)/g, "");
    coords = coords.replace(/\(/g, "");
    return coords;
  };

  const mapClick = () => {
    if (!mapAction) {
      setMapAction(true);
    } else if (mapAction) {
      setMapAction(false);
    }
  };
  const clickDrop = () => {
    if (dropdown === true) {
      setDropdown(false);
    } else if (dropdown === false) {
      setDropdown(true);
    }
  };

  const [participateMutation] = useMutation(PARTICIPATE, {
    variables: { id: id }
  });

  const participate = async () => {
    const {
      data: { paritcipate }
    } = await participateMutation();
    if (paritcipate) {
      toast.success("참석에 성공했습니다.");
    } else if (!participate) {
      toast.error("다시 시도해주세요.");
    }
  };

  return (
    <MeetingPresenter
      meetingId={id}
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
      coordsParam={coords}
      translate={translate}
      createdAt={createdAt}
      dropdown={dropdown}
      clickDrop={clickDrop}
      mapClick={mapClick}
      mapAction={mapAction}
      participate={participate}
      userId={userId}
      setEditId={setEditId}
      setEditing={setEditing}
    />
  );
};

MeetingContainer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
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
  coords: PropTypes.string,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
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

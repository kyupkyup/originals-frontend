import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import EditMeetingPresenter from "./EditMeetingPresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEE_MEETING, WRITE_MEETING, EDIT_MEETING } from "./EditMeetingQueries";
import useInput from "../../Hooks/useInput";
import Loader from "../Loader";
import { toast } from "react-toastify";
const EditMeetingContainer = ({ meetingId, setEdit, refetch }) => {
  const { data, loading } = useQuery(SEE_MEETING, {
    variables: {
      id: meetingId
    }
  });
  const titleEdit = useInput("");
  const meetingTimeEdit = useInput("");
  const meetingPlaceEdit = useInput("");
  const meetingPriceEdit = useInput("");
  const deadlineEdit = useInput("");
  const meetingHeadCountsEdit = useInput("");
  const marker = useRef("");
  const [mainCheck, setMainCheck] = useState(false);
  const [mapAction, setMapAction] = useState(false);
  const clickCheck = () => {
    if (!mainCheck) {
      setMainCheck(true);
    } else if (mainCheck) {
      setMainCheck(false);
    }
  };
  const mapClick = () => {
    if (!mapAction) {
      setMapAction(true);
    } else if (mapAction) {
      setMapAction(false);
    }
  };
  const [dateTime, setDateTime] = useState("2020-03-07 12:00");
  const setState = async dateTime1 => {
    await setDateTime(dateTime1);
  };
  const [limitDateTime, setLimitDateTime] = useState("2020-03-07 12:00");
  const setLimitState = async dateTime1 => {
    await setLimitDateTime(dateTime1);
  };
  const [writeMutation] = useMutation(WRITE_MEETING, {
    variables: {
      title: titleEdit.value,
      main: mainCheck,
      meetingTime: dateTime,
      meetingPlace: meetingPlaceEdit.value,
      meetingPrice: meetingPriceEdit.value,
      deadline: limitDateTime,
      coords: marker.current.toString(),
      // latitude: marker.current.getLat(),
      // longitude: marker.current.getLng(),
      meetingHeadCounts: parseInt(meetingHeadCountsEdit.value)
    }
  });
  const [editMutation] = useMutation(EDIT_MEETING, {
    variables: {
      id: meetingId,
      title: titleEdit.value,
      main: mainCheck,
      meetingTime: dateTime,
      meetingPlace: meetingPlaceEdit.value,
      meetingPrice: meetingPriceEdit.value,

      deadline: limitDateTime,
      coords: marker.current.toString(),

      // latitude: marker.current.getLat(),
      // longitude: marker.current.getLng(),
      meetingHeadCounts: parseInt(meetingHeadCountsEdit.value),
      action: "EDIT"
    }
  });
  const [deleteMutation] = useMutation(EDIT_MEETING, {
    variables: {
      id: meetingId,
      title: titleEdit.value,
      main: mainCheck,
      meetingTime: dateTime,
      meetingPlace: meetingPlaceEdit.value,
      meetingPrice: meetingPriceEdit.value,
      deadline: limitDateTime,
      coords: marker.current.toString(),

      // latitude: marker.current.getLat(),
      // longitude: marker.current.getLng(),
      meetingHeadCounts: parseInt(meetingHeadCountsEdit.value),
      action: "DELETE"
    }
  });
  const onSubmit = async e => {
    e.preventDefault();
    if (meetingId === "write") {
      if (
        titleEdit === "" ||
        meetingTimeEdit === "" ||
        meetingPlaceEdit === "" ||
        meetingPriceEdit === "" ||
        deadlineEdit === "" ||
        meetingHeadCountsEdit === ""
      ) {
        toast.error("빈칸을 채워주세요.");
      } else {
        try {
          const {
            data: { uploadMeeting }
          } = await writeMutation();
          if (uploadMeeting) {
            toast.success("모임 등록에 성공했습니다.");
            await refetch();
            setTimeout(() => setEdit("read"), 1000);
          } else if (!uploadMeeting) {
            toast.error("모임을 등록할 수 없습니다.");
          }
        } catch {
          toast.error("모임을 등록할 수 없습니다.");
        }
      }
    } else {
      if (
        titleEdit === "" ||
        meetingTimeEdit === "" ||
        meetingPlaceEdit === "" ||
        meetingPriceEdit === "" ||
        deadlineEdit === "" ||
        meetingHeadCountsEdit === ""
      ) {
        toast.error("빈칸을 채워주세요.");
      } else {
        try {
          const {
            data: { editMeeting }
          } = await editMutation();
          if (editMeeting) {
            toast.success("모임 수정에 성공했습니다.");
            await refetch();

            setTimeout(() => setEdit("read"), 1000);
          } else if (!editMeeting) {
            toast.error("모임을 수정할 수 없습니다.");
          }
        } catch {
          toast.error("모임을 수정할 수 없습니다.");
        }
      }
    }
  };
  const deleteMeeting = async () => {
    deleteMutation();
    await refetch();
    setTimeout(() => setEdit("read"), 1000);
  };

  if (meetingId === "write") {
    return (
      <EditMeetingPresenter
        meetingId={meetingId}
        title={titleEdit}
        main={mainCheck}
        meetingTime={dateTime}
        meetingPlace={meetingPlaceEdit}
        meetingPrice={meetingPriceEdit}
        deadline={limitDateTime}
        meetingHeadCounts={meetingHeadCountsEdit}
        clickCheck={clickCheck}
        mainCheck={mainCheck}
        refetch={refetch}
        setEdit={setEdit}
        onSubmit={onSubmit}
        mapClick={mapClick}
        mapAction={mapAction}
        setMarker={marker}
        setState={setState}
        setLimitState={setLimitState}
      />
    );
  } else {
    if (loading) {
      return <Loader />;
    } else if (!loading && data && data.seeMeeting) {
      const {
        seeMeeting: {
          title,
          main,
          meetingTime,
          meetingPlace,
          meetingPrice,
          deadline,
          coords,
          meetingHeadCounts
        }
      } = data;
      if (titleEdit.value === "") {
        titleEdit.setValue(title);
      }
      if (meetingTimeEdit.value === "") {
        setDateTime.setValue(meetingTime);
      }
      if (meetingPlaceEdit.value === "") {
        meetingPlaceEdit.setValue(meetingPlace);
      }
      if (meetingPriceEdit.value === "") {
        meetingPriceEdit.setValue(meetingPrice);
      }
      if (deadlineEdit.value === "") {
        limitDateTime.setValue(deadline);
      }
      if (meetingHeadCountsEdit.value === "") {
        meetingHeadCountsEdit.setValue(meetingHeadCounts);
      }

      if (main === true && mainCheck === false) {
        setMainCheck(true);
      }
      return (
        <EditMeetingPresenter
          meetingId={meetingId}
          title={titleEdit}
          main={mainCheck}
          meetingTime={dateTime}
          meetingPlace={meetingPlaceEdit}
          meetingPrice={meetingPriceEdit}
          deadline={limitDateTime}
          meetingHeadCounts={meetingHeadCountsEdit}
          clickCheck={clickCheck}
          mainCheck={mainCheck}
          refetch={refetch}
          setEdit={setEdit}
          onSubmit={onSubmit}
          deleteMeeting={deleteMeeting}
          mapClick={mapClick}
          mapAction={mapAction}
          setMarker={marker}
          setState={setState}
          dateTime={dateTime}
        />
      );
    } else {
      return null;
    }
  }
};

EditMeetingContainer.propTypes = {
  meetingId: PropTypes.string.isRequired
};

export default EditMeetingContainer;

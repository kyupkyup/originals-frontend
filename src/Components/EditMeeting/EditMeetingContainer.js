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
  const [loadingB, setLoading] = useState(false);
  const titleEdit = useInput("");
  const meetingPlaceEdit = useInput("");
  const meetingPriceEdit = useInput("");
  const meetingHeadCountsEdit = useInput("");
  const marker = useRef("");
  const [mainCheck, setMainCheck] = useState(false);
  const [mapAction, setMapAction] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const setState = async dateTime1 => {
    await setDateTime(dateTime1);
  };
  const [limitDateTime, setLimitDateTime] = useState("");
  const setLimitState = async dateTime1 => {
    await setLimitDateTime(dateTime1);
  };
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
  const translate = coords => {
    coords = coords.replace(/\s/g, "");
    coords = coords.replace(/\)/g, "");
    coords = coords.replace(/\(/g, "");
    return coords;
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
      meetingHeadCounts: parseInt(meetingHeadCountsEdit.value),
      action: "DELETE"
    }
  });
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (meetingId === "write") {
      if (
        titleEdit === "" ||
        meetingPlaceEdit === "" ||
        meetingPriceEdit === "" ||
        meetingHeadCountsEdit === ""
      ) {
        toast.error("빈칸을 채워주세요.");
        setLoading(false);
      } else {
        try {
          const {
            data: { uploadMeeting }
          } = await writeMutation();
          if (uploadMeeting) {
            await refetch();

            toast.success("모임 등록에 성공했습니다.");
            setEdit("read");
          } else if (!uploadMeeting) {
            toast.error("모임을 등록할 수 없습니다.");
            setEdit("read");
          }
        } catch {
          toast.error("의문의 문제로 모임을 등록할 수 없습니다.");
          setEdit("read");
        } finally {
          setLoading(false);
          setEdit("read");
        }
      }
    } else {
      if (
        titleEdit === "" ||
        meetingPlaceEdit === "" ||
        meetingPriceEdit === "" ||
        meetingHeadCountsEdit === ""
      ) {
        toast.error("빈칸을 채워주세요.");
        setLoading(false);
      } else {
        try {
          const {
            data: { editMeeting }
          } = await editMutation();
          if (editMeeting) {
            await refetch();

            toast.success("모임 수정에 성공했습니다.");
            setEdit("read");
          } else if (!editMeeting) {
            toast.error("모임을 수정할 수 없습니다.");
            setEdit("read");
          }
        } catch {
          toast.error("의문의 문제로 모임을 수정할 수 없습니다.");
          setEdit("read");
        } finally {
          setLoading(false);
          setEdit("read");
        }
      }
    }
  };
  const deleteMeeting = async () => {
    setLoading(true);

    await deleteMutation();
    await refetch();
    setLoading(false);
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
        loadingB={loadingB}
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
      if (dateTime === "") {
        setDateTime(meetingTime);
      }
      if (meetingPlaceEdit.value === "") {
        meetingPlaceEdit.setValue(meetingPlace);
      }
      if (meetingPriceEdit.value === "") {
        meetingPriceEdit.setValue(meetingPrice);
      }
      if (limitDateTime === "") {
        setLimitDateTime(deadline);
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
          coordsParam={coords}
          dateTime={dateTime}
          loadingB={loadingB}
          translate={translate}
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

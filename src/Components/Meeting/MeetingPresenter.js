/*global kakao*/

import React from "react";
import styled from "styled-components";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import DropdownButton from "../Button/DropdownButton";
import Participants from "../Participants";
import Button from "../Button/Button";
import DisabledButton from "../Button/DisabledButton";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";
import { Map } from "../Icons";
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

  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    font-size: 10pt;
  }
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
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 10pt;
  }
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
  display: flex;
  justify-content: space-between;

  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 9pt;
    display: flex;
    align-items: center;
  }
`;
const MeetingPlace = styled.div`
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 9pt;
  }
`;
const MeetingPrice = styled.div`
  font-size: 10pt;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 9pt;
    display: flex;
    flex-direction: row;
  }
`;
const MapButton = styled.div`
  width: 5%;
  font-size: 9pt;
  margin-left: 10px;
  opacity: 0.9;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  width:100%:
  padding-bottom:20px;
`;
const Deadline = styled.div`
  font-size: 10pt;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;

  border-radius: 10px;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 9pt;
  }
`;
const MeetingHeadCounts = styled.div`
  font-size: 10pt;

  margin-bottom: 10px;

  border-radius: 10px;
  justify-content: space-between;
  display: flex;
  border: 1px solid ${props => props.theme.lightGray3};
  width: 100%;
  padding: 10px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 9pt;
  }
`;
const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const Text = styled(FatText)`
  font-size: 13pt;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    font-size: 9pt;
    font-weight: 400;
    margin: 0 2px;
  }
`;
const Con = styled.div`
  display: flex;
  align-items: center;
`;
const Span = styled.span`
  width: 5%;
  margin-left: 10px;
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
  translate,
  createdAt,
  coordsParam,
  mapClick,
  mapAction,
  dropdown,
  clickDrop,
  participate,
  userId,
  setEditing
}) => {
  if (mapAction === true) {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f2fb500392c56034d629914c8b7465c7";
    document.head.appendChild(script);
    var coords = translate(coordsParam);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById("map");
        let map = new kakao.maps.Map(el, {
          center: new kakao.maps.LatLng(
            Number(coords.split(",")[0]),
            Number(coords.split(",")[1])
          ),
          draggable: true,
          scrollWheel: true
        });
        let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(
            Number(coords.split(",")[0]),
            Number(coords.split(",")[1])
          )
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, "click", function() {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          infowindow.setContent(
            '<div style="padding:5px;font-size:12px;">' +
              meetingPlace +
              "</div>"
          );
          infowindow.open(map, marker);
        });
      });
    };
  }
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
          <Text text={meetingTime} />
          <Span />
        </MeetingTime>

        <MeetingPlace>
          <Text text={" 모임 장소 :   "} />
          <Text text={meetingPlace} />
          <MapButton onClick={() => mapClick()}>
            <Map />
          </MapButton>
        </MeetingPlace>

        <MapContainer>{mapAction ? <div id="map"></div> : null}</MapContainer>
        <MeetingPrice>
          <Con>
            <Text text={" 모임 가격 :   "} />
          </Con>
          <Con>
            <Text text={meetingPrice} />
          </Con>
          <Span />
        </MeetingPrice>

        <Deadline>
          <Text text={" 마감 기간 :   "} />
          <Text text={deadline} />
          <Span />
        </Deadline>

        <MeetingHeadCounts>
          <Text text={" 제한 인원 :   "} />
          <Text text={meetingHeadCounts} />
          <Span />
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

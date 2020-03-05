/*global kakao*/

import React from "react";
import styled from "styled-components";
import CheckboxToggle from "../semi-component/toggle";
import Button from "../Button/Button";
import { X, Map } from "../Icons";
import Input from "../Input";
import "font-awesome/css/font-awesome.css";

import "flatpickr/dist/flatpickr.min.css";
import locale from "flatpickr/dist/l10n/ko";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";
import "../../Styles/css/mapCss.css";
import { toast } from "react-toastify";
import DatetimePicker, {
  parseDate,
  setLocale
} from "react-datetimepicker-syaku";
import DateInput from "../DateInput";
import DateLimitInput from "../DateLimitInput";
setLocale(locale.ko);

const AllContainer = styled.div`
  width: 700px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    font-size: 10pt;
  }
`;

const Container = styled.div`
  ${props => props.theme.whiteBox}
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const XButtonContainer = styled.div`
  display: flex;
  width: 100%;
  text-align: right;
  margin-bottom: 20px;
`;

const XButton = styled.button`
  width: 40px;
  border: 0;
  background-color: white;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  &:(:last-child) {
    margin-bottom: 10px;
  }
`;
const Content = styled(Input)`
  width: 100%;
`;
const ContentPlace = styled(Input)`
  width: 93%;
`;

const MapButton = styled.span`
  width: 5%;
  font-size: 9pt;
  margin-left: 10px;
  opacity: 0.9;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  width:100%:
  padding-bottom:20px;
`;

const SpinnerContainer = styled.div`
  padding: 10px;
  width: 600px;
  display: flex;
  flex-direction: row;
  font-size: 11pt;
  align-items: center;
  &: {
    margin-left: 10px;
  }
`;
const CheckboxToggleM = styled(CheckboxToggle)`
  margin-left: 10px;
`;
const SubmitButton = styled(Button)`
  margin-top: 15px;
`;
const ButtonContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export default ({
  meetingId,
  title,
  meetingTime,
  meetingPlace,
  meetingPrice,
  deadline,
  meetingHeadCounts,
  setEdit,
  mainCheck,
  clickCheck,
  onSubmit,
  deleteMeeting,
  mapAction,
  mapClick,
  setMarker,
  setState,
  dateTime
}) => {
  if (mapAction === true) {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=f2fb500392c56034d629914c8b7465c7";
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        let el = document.getElementById("map");
        let map = new kakao.maps.Map(el, {
          center: new kakao.maps.Coords(523951.25, 1085073.75),
          draggable: true,
          scrollWheel: true
        });

        let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
        let ps = new kakao.maps.services.Places();

        // 키워드로 장소를 검색합니다
        ps.keywordSearch(meetingPlace.value, placesSearchCB);
        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB(data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i = 0; i < data.length; i++) {
              displayMarker(data[i]);
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
          }
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x)
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, "click", function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다

            infowindow.setContent(
              '<div style="padding:5px;font-size:12px;">' +
                place.place_name +
                "</div>"
            );
            infowindow.open(map, marker);
            setMarker.current = marker.getPosition();
            if (setMarker.current !== "") {
              toast.success("장소가 선택되었습니다.");
              mapClick(false);
            }
          });
        }
      });
    };
  }

  if (meetingId === "write") {
    return (
      <AllContainer>
        <XButtonContainer>
          <XButton onClick={() => setEdit("read")}>
            <X />
          </XButton>
        </XButtonContainer>

        <Container className="container">
          <form onSubmit={onSubmit}>
            <ContentContainer>
              <Content placeholder={"제목"} {...title} />
            </ContentContainer>
            <SpinnerContainer>
              <CheckboxToggleM
                checked={mainCheck}
                onClick={() => clickCheck()}
              />{" "}
              메인
            </SpinnerContainer>
            <ContentContainer>
              <DateInput setState={setState} value={meetingTime} />{" "}
            </ContentContainer>

            <ContentContainer>
              <Content placeholder={"모임 비용"} {...meetingPrice} />
            </ContentContainer>
            <ContentContainer>
              <DateLimitInput setState={setState} value={deadline} />{" "}
            </ContentContainer>
            <ContentContainer>
              <Content
                type="number"
                placeholder={"제한 인원"}
                {...meetingHeadCounts}
              />
            </ContentContainer>
            <ContentContainer>
              <ContentPlace placeholder={"모임 장소"} {...meetingPlace} />
              <MapButton onClick={() => mapClick()}>
                <Map />
              </MapButton>
            </ContentContainer>
            <MapContainer>
              {mapAction ? <div id="map"></div> : null}
            </MapContainer>
            <SubmitButton text={"모임 만들기"} />
          </form>
        </Container>
      </AllContainer>
    );
  } else {
    return (
      <AllContainer>
        <XButtonContainer>
          <XButton onClick={() => setEdit("read")}>
            <X />
          </XButton>
        </XButtonContainer>
        <Container>
          <form onSubmit={onSubmit}>
            <ContentContainer>
              <Content placeholder={"제목"} {...title} />
            </ContentContainer>
            <SpinnerContainer>
              <CheckboxToggleM
                checked={mainCheck}
                onClick={() => clickCheck()}
              />{" "}
              메인
            </SpinnerContainer>
            <ContentContainer>
              <Content placeholder={"모임 시간"} {...meetingTime} />
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"모임 장소"} {...meetingPlace} />
              <MapButton onClick={() => mapClick()}>
                <Map />
              </MapButton>
            </ContentContainer>
            <MapContainer>
              {mapAction ? <div id="map"></div> : null}
            </MapContainer>
            <ContentContainer>
              <Content placeholder={"모임 비용"} {...meetingPrice} />
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"마감 시간"} {...deadline} />
            </ContentContainer>
            <ContentContainer>
              <Content
                placeholder={"제한 인원"}
                type="number"
                {...meetingHeadCounts}
              />
            </ContentContainer>

            <ButtonContainer>
              <SubmitButton text={"수정하기"} />
            </ButtonContainer>
          </form>
          <ButtonContainer>
            <Button text={"글 삭제"} onClick={() => deleteMeeting()} />
          </ButtonContainer>
        </Container>
      </AllContainer>
    );
  }
};

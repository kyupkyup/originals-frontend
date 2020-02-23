import React from "react";
import styled from "styled-components";
import CheckboxToggle from "../semi-component/toggle";

import Button from "../Button/Button";
import { X } from "../Icons";
import Input from "../Input";
const AllContainer = styled.div`
  width: 700px;
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
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 10px;
  &:(:last-child) {
    margin-bottom: 10px;
  }
`;
const Content = styled(Input)`
  width: 100%;
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
  deleteMeeting
}) => {
  if (meetingId === "write") {
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
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"모임 비용"} {...meetingPrice} />
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"마감 시간"} {...deadline} />
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"제한 인원"} {...meetingHeadCounts} />
            </ContentContainer>

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
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"모임 비용"} {...meetingPrice} />
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"마감 시간"} {...deadline} />
            </ContentContainer>
            <ContentContainer>
              <Content placeholder={"제한 인원"} {...meetingHeadCounts} />
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

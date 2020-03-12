import React from "react";
import styled from "styled-components";
import DropdownCompo from "../Dropdown";
import CheckboxToggle from "../semi-component/toggle";
import Input from "../Input";
import { X } from "../Icons";
import Button from "../Button/Button";
import Textarea from "../Textarea";
import "react-dropdown/style.css";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";
import { Label } from "semantic-ui-react";
import FatText from "../FatText";

const Container = styled.div`
  ${props => props.theme.whiteBox}
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    font-size: 10pt;
    padding: 3px;
  }
`;
const XButtonContainer = styled.div`
  display: flex;
  width: 100%;
  text-align: right;
  margin-bottom: 20px;
  cursor: pointer;
`;

const XButton = styled.button`
  width: 40px;
  border: 0;
  background-color: white;
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 10px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    margin-top: 10px;
    width: 100%;
    padding: 0;
  }
`;
const Title = styled(Input)`
  width: 300px;
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
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 250px;
    font-size: 10pt;
    margin: 0;
  }
`;

const CheckboxToggleM = styled(CheckboxToggle)`
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    margin-left: 20px;
    width: 50px;
  }

  margin-left: 10px;
`;
const Text = styled(FatText)`
  width: 50px;
`;
const CaptionContainer = styled.div`
  width: 100%;
  padding: 10px;
`;
const Caption = styled(Textarea)`
  width: 100%;
  height: 300px;
`;
const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
const ButtonContainer = styled.div`
  margin-top: 10px;
  width: 100%;
`;

export default ({
  postId,
  files,
  author,
  titleEdit,
  captionEdit,
  defaultOption,
  options,
  clickCheck,
  clickAnnounce,
  mainCheck,
  announceCheck,
  onSubmit,
  setEdit,
  deletePost,
  setDefaultOptions,
  loadingB
}) => {
  if (postId === "write") {
    return (
      <>
        <XButtonContainer>
          <XButton onClick={() => setEdit("read")}>
            <X />
          </XButton>
        </XButtonContainer>

        <Container>
          <form onSubmit={onSubmit}>
            <TitleContainer>
              <Title placeholder={"제목"} {...titleEdit} />
            </TitleContainer>
            <SpinnerContainer>
              <DropdownCompo
                setDefaultOptions={setDefaultOptions}
                options={options}
                defaultOption={defaultOption}
              />
              <CheckboxToggleM
                checked={mainCheck}
                onClick={() => clickCheck()}
              />{" "}
              <Text text={"메인"} />
              <CheckboxToggleM
                checked={announceCheck}
                onClick={() => clickAnnounce()}
              />{" "}
              <Text text={"공지"} />
            </SpinnerContainer>
            <CaptionContainer>
              <Caption placeholder={"글 내용"} {...captionEdit} />
            </CaptionContainer>
            <SubmitButton text={"글 쓰기"} loading={loadingB} />
          </form>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <XButtonContainer>
          <XButton onClick={() => setEdit("read")}>
            <X />
          </XButton>
        </XButtonContainer>
        <Container>
          <form onSubmit={onSubmit}>
            <TitleContainer>
              <Title placeholder={"제목"} {...titleEdit} />
            </TitleContainer>
            <SpinnerContainer>
              <DropdownCompo
                setDefaultOptions={setDefaultOptions}
                options={options}
                defaultOption={defaultOption}
              />
              <CheckboxToggleM
                checked={mainCheck}
                onClick={() => clickCheck()}
              />{" "}
              메인
              <CheckboxToggleM
                checked={announceCheck}
                onClick={() => clickAnnounce()}
              />{" "}
              공지
            </SpinnerContainer>
            <CaptionContainer>
              <Caption placeholder={"글 내용"} {...captionEdit} />
            </CaptionContainer>
            <ButtonContainer>
              <SubmitButton text={"수정하기"} loading={loadingB} />
            </ButtonContainer>
          </form>
          <ButtonContainer>
            <Button text={"글 삭제"} onClick={() => deletePost()} />
          </ButtonContainer>
        </Container>
      </>
    );
  }
};

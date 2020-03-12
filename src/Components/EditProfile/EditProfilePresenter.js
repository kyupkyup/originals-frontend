import React from "react";
import styled from "styled-components";
import Avatar from "../Avatar";
import FatText from "../FatText";
import Helmet from "react-helmet";
import Input from "../Input";
import Button from "../Button/Button";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";

const Wrapper = styled.div`
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    font-size: 10pt;
  }
`;

const Header = styled.div``;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;
const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
export default ({
  email,
  avatar,
  password,
  userName,
  phoneNum,
  birthday,
  introduce,
  passwordEdit,
  userNameEdit,
  phoneNumEdit,
  birthdayEdit,
  introduceEdit,
  onSubmit,
  setAction,
  loadingB
}) => {
  return (
    <Wrapper>
      <Header>
        <Avatar />
        <FatText />
      </Header>
      <Form>
        <Helmet>
          <title>프로필 수정 | Originals</title>
        </Helmet>
        <form onSubmit={onSubmit}>
          <Input
            placeholder={"이메일"}
            value={email}
            type="email"
            disabled={true}
          />
          <Input placeholder={"비밀번호"} {...passwordEdit} type="password" />
          <Input placeholder={"이름"} {...userNameEdit} />
          <Input placeholder={"전화번호"} {...phoneNumEdit} />
          <Input placeholder={"생일"} {...birthdayEdit} />
          <Input placeholder={"한 줄 소개"} {...introduceEdit} />

          <Button text={"프로필 수정"} loading={loadingB} />
          <Button text={"계정 삭제"} onClick={() => setAction("DELETE")} />
        </form>
      </Form>
    </Wrapper>
  );
};

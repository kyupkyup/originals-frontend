import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Helmet from "react-helmet";

// string literals are supported through IconName union type

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

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
  action,
  email,
  password,
  userName,
  phoneNum,
  birthday,
  introduce,
  onSubmit
}) => (
  <Wrapper>
    <Form>
      {action === "signUp" && (
        <>
          <Helmet>
            <title>계정 생성 | Originals</title>
          </Helmet>

          <form onSubmit={onSubmit}>
            <Input placeholder={"이메일"} {...email} type="email" />
            <Input placeholder={"비밀번호"} {...password} type="password" />
            <Input placeholder={"이름"} {...userName} />
            <Input placeholder={"전화번호"} {...phoneNum} />
            <Input placeholder={"생일"} {...birthday} />
            <Input placeholder={"한 줄 소개"} {...introduce} />

            <Button text="계정 생성" />
          </form>
        </>
      )}{" "}
      {action === "login" && (
        <>
          <Helmet>
            <title>계정 생성 | Originals</title>
          </Helmet>
          <form>
            <Input placeholder={"이메일"} {...email} type="email" />
            <Input placeholder={"비밀번호"} {...password} type="password" />

            <Button text="로그인" />
          </form>
        </>
      )}
    </Form>
  </Wrapper>
);

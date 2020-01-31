import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_USER, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");

  const email = useInput("");
  const password = useInput("");
  const userName = useInput("");
  const phoneNum = useInput("");
  const birthday = useInput("");
  const introduce = useInput("");

  const [loginMutation] = useMutation(LOG_IN, {
    variables: { email: email.value, password: password.value }
  });

  const [createUserMutation] = useMutation(CREATE_USER, {
    variables: {
      email: email.value,
      password: password.value,
      userName: userName.value,
      phoneNum: phoneNum.value,
      birthday: birthday.value,
      introduce: introduce.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "login") {
      if (email.value !== "") {
        if (password.value !== "") {
          try {
            const {
              data: { login: token }
            } = await loginMutation();
            if (token !== "" && token !== undefined) {
              localLogInMutation({ variables: { token } });
            }
          } catch {
            toast.error("비밀번호가 틀렸습니다.");
          }
        } else {
          toast.error("비밀번호를 입력해주세요.");
        }
      } else {
        toast.error("이메일을 입력해주세요.");
      }
    } else if (action === "signUp") {
      // TODO
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      userName={userName}
      email={email}
      password={password}
      phoneNum={phoneNum}
      birthday={birthday}
      introduce={introduce}
      onSubmit={onSubmit}
    />
  );
};

import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_USER, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("login");

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
      introduce: introduce.value,
      classes: 1
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
            console.log(token);
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
      if (
        email.value !== "" &&
        userName.value !== "" &&
        password.value !== "" &&
        birthday.value !== "" &&
        phoneNum.value !== "" &&
        introduce.value !== ""
      ) {
        try {
          const createUser = await createUserMutation();
          if (!createUser) {
            toast.error("계정을 생성할 수 없습니다. 다시 시도해주세요.");
          } else {
            toast.success("계정이 생성되었습니다! 로그인 해주세요.");
            setTimeout(() => setAction("login"), 3000);
          }
        } catch (e) {
          toast.error("계정을 생성할 수 없습니다. 다시 시도해주세요.");
        }
      } else {
        toast.error("모든 칸을 다 채워주세요.");
      }
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

import React, { useState } from "react";
import propTypes from "prop-types";
import EditProfilePresenter from "./EditProfilePresenter";
import { useMutation, useQuery } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { EDIT_PROFILE, GET_USER } from "./EditProfileQueries";
import Loader from "../Loader";
import { toast } from "react-toastify";

const EditProfileContainer = ({ id, editProfile, logOut }) => {
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      id: id
    }
  });
  const [action, setAction] = useState("EDIT");

  const passwordEdit = useInput("");
  const userNameEdit = useInput("");
  const phoneNumEdit = useInput("");
  const birthdayEdit = useInput("");
  const introduceEdit = useInput("");

  const [editAccountMutation] = useMutation(EDIT_PROFILE, {
    variables: {
      id: id,
      password: passwordEdit.value,
      userName: userNameEdit.value,
      phoneNum: phoneNumEdit.value,
      birthday: birthdayEdit.value,
      introduce: introduceEdit.value,
      action: action
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "EDIT") {
      if (
        passwordEdit.value !== "" &&
        userNameEdit.value !== "" &&
        phoneNumEdit.value !== "" &&
        birthdayEdit.value !== "" &&
        introduceEdit.value !== ""
      ) {
        try {
          await editAccountMutation();
          toast.success("계정 수정 성공");
          setTimeout(() => editProfile("Profile"), 3000);
        } catch {
          toast.error("계정을 수정할 수 없습니다. 다시 시도해주세요.");
        }
      } else {
        toast.error("빈칸을 남겨두지 마세요.");
      }
    } else if (action === "DELETE") {
      try {
        await editAccountMutation();
        toast.success("바이바이~");
        logOut();
      } catch {
        toast.error("계정을 삭제할 수 없습니다. 다시 시도해주세요.");
      }
    }
  };

  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.seeProfileById) {
    const {
      seeProfileById: {
        email,
        avatar,
        password,
        userName,
        phoneNum,
        birthday,
        introduce
      }
    } = data;

    if (
      passwordEdit.value === "" ||
      userNameEdit.value === "" ||
      phoneNumEdit.value === "" ||
      birthdayEdit.value === "" ||
      introduceEdit.value === ""
    ) {
      passwordEdit.setValue(password);
      userNameEdit.setValue(userName);
      phoneNumEdit.setValue(phoneNum);
      birthdayEdit.setValue(birthday);
      introduceEdit.setValue(introduce);
    }
    return (
      <EditProfilePresenter
        email={email}
        avatar={avatar}
        passwordEdit={passwordEdit}
        userNameEdit={userNameEdit}
        phoneNumEdit={phoneNumEdit}
        birthdayEdit={birthdayEdit}
        introduceEdit={introduceEdit}
        onSubmit={onSubmit}
        setAction={setAction}
      />
    );
  }
};

EditProfileContainer.propTypes = {
  id: propTypes.string.isRequired
};

export default EditProfileContainer;

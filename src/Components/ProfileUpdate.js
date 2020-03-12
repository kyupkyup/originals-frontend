import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import axios from "axios";
import styled from "styled-components";
import { X } from "./Icons";
import Button from "./Button/Button";
import ImageUploaderC from "./ImageUploader";
import apolloClientOptions from "../apollo";
import { toast } from "react-toastify";
const PROFILE_UPDATE = gql`
  mutation avatarEdit($avatar: String!) {
    avatarEdit(avatar: $avatar) {
      id
    }
  }
`;
const Container = styled.div`
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
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
const ImageContainer = styled.div`
    width:100%:
    display:flex;
    justify-content:center;
    align-items:center;
`;
const ProfileUpdate = ({ setUpdate, refetch }) => {
  const [pictures, setPictures] = useState([]);
  const [profileUpdateMutation] = useMutation(PROFILE_UPDATE);

  const handleSubmit = async () => {
    let formData = new FormData();
    formData.append("file", pictures[0][0]);
    try {
      const {
        data: { location }
      } = await axios
        .post(apolloClientOptions.uri + "/api/avatarEdit", formData, {
          headers: {
            "content-type": "multipart/form-data"
          }
        })
        .catch(function(err) {
          console.log(err);
        });
      const {
        data: { avatarEdit }
      } = await profileUpdateMutation({
        variables: {
          avatar: location
        }
      });

      if (avatarEdit.id) {
        toast.success("프로필 사진을 업데이트 했습니다.");
        await refetch();
        await setUpdate(false);
      }
    } catch (e) {
      console.log(e);
      toast.error("프로필 사진을 업데이트할 수 없습니다.");
    }
  };
  return (
    <Container>
      {" "}
      <XButtonContainer>
        <XButton onClick={() => setUpdate(false)}>
          <X />
        </XButton>
      </XButtonContainer>
      <ImageContainer>
        <ImageUploaderC pictures={pictures} setPictures={setPictures} />
      </ImageContainer>
      <Button onClick={() => handleSubmit()} text="수정" />
    </Container>
  );
};

ProfileUpdate.propTypes = {
  setUpdate: PropTypes.func,
  refetch: PropTypes.func
};
export default ProfileUpdate;

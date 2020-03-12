import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import EditPostPresenter from "./EditPostPresenter";
import { SEE_POST, EDIT_POST, WRITE_POST } from "./EditPostQueries";
import Loader from "../Loader";
import { classifyOptions } from "../../utils/dropdownOptions";
import { toast } from "react-toastify";

const EditPostContainer = ({ postId, setEdit, refetch }) => {
  const { data, loading } = useQuery(SEE_POST, {
    variables: { id: postId }
  });

  const [loadingB, setLoading] = useState(false);
  const titleEdit = useInput("");
  const captionEdit = useInput("");
  const [defaultOptionNum, setDefaultOptions] = useState("공지사항");
  const [mainCheck, setMainCheck] = useState(false);
  const [announceCheck, setAnnounceCheck] = useState(false);
  const [writeMutation] = useMutation(WRITE_POST, {
    variables: {
      classifyNum: defaultOptionNum,
      main: mainCheck,
      announcement: announceCheck,
      title: titleEdit.value,
      caption: captionEdit.value
    }
  });

  const [editMutation] = useMutation(EDIT_POST, {
    variables: {
      id: postId,
      classifyNum: defaultOptionNum,
      main: mainCheck,
      announcement: announceCheck,
      title: titleEdit.value,
      caption: captionEdit.value,
      action: "EDIT"
    }
  });
  const [deleteMutation] = useMutation(EDIT_POST, {
    variables: {
      id: postId,
      classifyNum: defaultOptionNum,
      main: mainCheck,
      announcement: announceCheck,
      title: titleEdit.value,
      caption: captionEdit.value,
      action: "DELETE"
    }
  });

  const clickCheck = () => {
    if (!mainCheck) {
      setMainCheck(true);
    } else if (mainCheck) {
      setMainCheck(false);
    }
  };
  const clickAnnounce = () => {
    if (announceCheck === false) {
      setAnnounceCheck(true);
    } else if (announceCheck === true) {
      setAnnounceCheck(false);
    }
  };
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (postId === "write") {
      if (titleEdit.value === "" || captionEdit.value === "") {
        toast.error("제목과 게시글 내용을 입력해주세요.");
      }
      try {
        const {
          data: { upload }
        } = await writeMutation();

        if (!upload) {
          toast.error("게시글을 등록할 수 없습니다.");
        } else if (upload) {
          await refetch();
          toast.success("게시글이 등록되었습니다.");
        }
      } catch {
        toast.error("의문의 문제로 게시글을 등록할 수 없습니다.");
      } finally {
        setLoading(false);
      }
    } else {
      if (titleEdit.value === "" || captionEdit.value === "") {
        toast.error("제목과 게시글 내용을 입력해주세요.");
      }
      try {
        const {
          data: { editPost }
        } = await editMutation();
        if (!editPost) {
          toast.error("게시글을 등록할 수 없습니다.");
        } else if (editPost) {
          await refetch();

          toast.success("게시글이 수정되었습니다.");
        }
      } catch {
        toast.error("의문의 문제로 게시글을 등록할 수 없습니다.");
      } finally {
        setLoading(false);
      }
    }
  };
  const deletePost = async () => {
    deleteMutation();
    await refetch();
    setTimeout(() => setEdit("read"), 1000);
  };

  if (postId === "write") {
    return (
      <EditPostPresenter
        postId={postId}
        titleEdit={titleEdit}
        captionEdit={captionEdit}
        defaultOption={defaultOptionNum}
        clickCheck={clickCheck}
        clickAnnounce={clickAnnounce}
        mainCheck={mainCheck}
        announceCheck={announceCheck}
        options={classifyOptions}
        setEdit={setEdit}
        onSubmit={onSubmit}
        deletePost={deletePost}
        setDefaultOptions={setDefaultOptions}
        loadingB={loadingB}
      />
    );
  } else {
    if (loading) {
      return <Loader />;
    } else if (!loading && data && data.seePost) {
      const {
        seePost: {
          id,
          files,
          author,
          classifyNum,
          main,
          announcement,
          title,
          caption
        }
      } = data;
      if (titleEdit.value === "") {
        titleEdit.setValue(title);
      }
      if (captionEdit.value === "") {
        captionEdit.setValue(caption);
      }
      if (main === true && mainCheck === false) {
        setMainCheck(true);
      }
      if (announcement === true && announceCheck === false) {
        setAnnounceCheck(true);
      }
      return (
        <EditPostPresenter
          id={id}
          files={files}
          author={author}
          titleEdit={titleEdit}
          captionEdit={captionEdit}
          defaultOption={classifyNum}
          options={classifyOptions}
          clickCheck={clickCheck}
          clickAnnounce={clickAnnounce}
          mainCheck={mainCheck}
          announceCheck={announceCheck}
          setEdit={setEdit}
          onSubmit={onSubmit}
          deletePost={deletePost}
          setDefaultOptions={setDefaultOptions}
          loadingB={loadingB}
        />
      );
    } else {
      return null;
    }
  }
};
EditPostContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

export default EditPostContainer;

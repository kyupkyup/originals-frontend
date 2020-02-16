import React, { useState } from "react";
import BulletinPresenter from "./BulletinPresenter";
import { useQuery } from "react-apollo-hooks";
import PropTypes from "prop-types";
import { SEE_POST, TOGGLE_POST } from "./BulletinQueries";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./BulletinQueries";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import Loader from "../Loader";
import useInput from "../../Hooks/useInput";
import { ME } from "../../SharedQueries";
const BulletinContainer = ({
  id,
  files,
  author,
  classifyNum,
  main,
  announcement,
  title,
  caption,
  isLiked,
  isViewed,
  viewsCount,
  likesCount,
  commentsCount,
  views,
  likes,
  comments,
  createdAt
}) => {
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [togglePostMutation] = useMutation(TOGGLE_POST, {
    variables: { postId: id }
  });
  const newComment = useInput("");

  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likesCount);
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: newComment.value }
  });

  // if (isViewed === false) {
  //   togglePostMutation();
  // }

  const toggleLike = () => {
    toggleLikeMutation();

    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }
  };

  function createdAtParsed(createdAt) {
    return createdAt.substring(0, 10) + "  " + createdAt.substring(11, 19);
  }

  const onKeyPress = async event => {
    const { which } = event;

    if (which === 13) {
      event.preventDefault();

      try {
        await addCommentMutation();
      } catch {
        toast.error("댓글을 입력할 수 없습니다.");
      }
      newComment.setValue("");
    }
  };
  return (
    <>
      <BulletinPresenter
        id={id}
        files={files}
        author={author}
        classifyNum={classifyNum}
        main={main}
        announcement={announcement}
        title={title}
        caption={caption}
        isLiked={isLikedS}
        viewsCount={viewsCount}
        likesCount={likeCountS}
        commentsCount={commentsCount}
        views={views}
        likes={likes}
        comments={comments}
        createdAt={createdAtParsed(createdAt)}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        newComment={newComment}
      />
    </>
  );
};

BulletinContainer.propTypes = {
  id: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ),
  author: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      classes: PropTypes.number.isRequired
    }).isRequired
  ),
  classifyNum: PropTypes.number.isRequired,
  main: PropTypes.bool.isRequired,
  announcement: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  viewsCount: PropTypes.number,
  likesCount: PropTypes.number,
  commentsCount: PropTypes.number,
  views: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ),
  likes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ),
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          userName: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired
        })
      ),
      text: PropTypes.string.isRequired
    })
  ),
  createdAt: PropTypes.string
};

export default BulletinContainer;

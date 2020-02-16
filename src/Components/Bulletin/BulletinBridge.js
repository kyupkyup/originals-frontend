import React from "react";
import { useQuery } from "react-apollo-hooks";
import PropTypes from "prop-types";
import { SEE_POST } from "./BulletinQueries";
import Loader from "../Loader";
import BulletinContainer from "./BulletinContainer";

const BulletinBridge = postId => {
  const { data, loading } = useQuery(SEE_POST, {
    variables: { id: postId.postId }
  });

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
      }
    } = data;
    return (
      <BulletinContainer
        id={id}
        files={files}
        author={author}
        classifyNum={classifyNum}
        main={main}
        announcement={announcement}
        title={title}
        caption={caption}
        isLiked={isLiked}
        isViewed={isViewed}
        viewsCount={viewsCount}
        likesCount={likesCount}
        commentsCount={commentsCount}
        views={views}
        likes={likes}
        comments={comments}
        createdAt={createdAt}
      />
    );
  }
};

BulletinBridge.propTypes = {
  postId: PropTypes.string.isRequired
};

export default BulletinBridge;

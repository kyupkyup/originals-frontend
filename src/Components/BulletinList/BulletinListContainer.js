import React, { useState } from "react";
import BulletinListPresenter from "./BulletinListPresenter";
import PropTypes from "prop-types";

const BulletinListContainer = ({
  id,
  classifyNum,
  posts,
  setEditId,
  userId
}) => {
  const [action, setAction] = useState("nothing");

  return (
    <BulletinListPresenter
      id={id}
      classifyNum={classifyNum}
      posts={posts}
      setEditId={setEditId}
      userId={userId}
      setAction={setAction}
      action={action}
    />
  );
};

BulletinListContainer.propTypes = {
  id: PropTypes.string.isRequired,
  classifyNum: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      main: PropTypes.bool.isRequired,
      announcement: PropTypes.bool.isRequired,
      author: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired
        })
      ),
      likesCount: PropTypes.number,
      viewsCount: PropTypes.number,
      classifyNum: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired,
  setEditId: PropTypes.func
  // id: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  // likesCount: PropTypes.number,
  // viewsCount: PropTypes.number,
  // classifyNum: PropTypes.number.isRequired,
  // createdAt: PropTypes.string.isRequired
};

export default BulletinListContainer;

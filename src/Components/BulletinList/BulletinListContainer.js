import React, { useState } from "react";
import BulletinListPresenter from "./BulletinListPresenter";
import PropTypes from "prop-types";

const BulletinListContainer = ({ id, classifyNum, posts }) => {
  const [action, setAction] = useState("nothing");

  const openBulletin = async postId => {
    if (action === "nothing") {
      await setAction(postId);
    } else if (action !== "nothing") {
      await setAction(postId);
    }
  };

  console.log(action + "리스트 프리젠터");

  return (
    <BulletinListPresenter
      id={id}
      classifyNum={classifyNum}
      posts={posts}
      openBulletin={openBulletin}
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
      likesCount: PropTypes.number,
      viewsCount: PropTypes.number,
      classifyNum: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired
  // id: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  // likesCount: PropTypes.number,
  // viewsCount: PropTypes.number,
  // classifyNum: PropTypes.number.isRequired,
  // createdAt: PropTypes.string.isRequired
};

export default BulletinListContainer;

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

  const openBulletin = async post => {
    if (action === "nothing") {
      await setAction(post.id);
      if (userId === post.author.id) {
        await setEditId(post.id);
      } else {
        await setEditId("");
      }
    } else if (action !== "nothing") {
      await setAction(post.id);
      if (userId === post.author.id) {
        await setEditId(post.id);
      } else {
        await setEditId("");
      }
    }
  };

  return (
    <BulletinListPresenter
      id={id}
      classifyNum={classifyNum}
      posts={posts}
      openBulletin={openBulletin}
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
  ).isRequired
  // id: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  // likesCount: PropTypes.number,
  // viewsCount: PropTypes.number,
  // classifyNum: PropTypes.number.isRequired,
  // createdAt: PropTypes.string.isRequired
};

export default BulletinListContainer;

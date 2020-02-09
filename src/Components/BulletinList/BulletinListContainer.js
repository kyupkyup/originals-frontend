import React, { useState, useEffect } from "react";
import BulletinListPresenter from "./BulletinListPresenter";
import PropTypes from "prop-types";
import Bulletin from "../Bulletin";

import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import {
  SEE_BULLETIN_LIST,
  SEE_FULL_BULLETIN_LIST,
  SEE_POST
} from "./BulletinListQueries";
import { TOGGLE_POST } from "./BulletinListQueries";

const BulletinListContainer = ({ id, classifyNum, posts }) => {
  // const querying = useQuery(SEE_POST, {
  //   variables: { postId }
  // });
  // const [isViewedF, setIsViewed] = useState(data.isViewed);
  // const [viewCountF, setViewCount] = useState(data.viewsCount);
  // const [classifyAction, setAction] = useState("1");

  // const { data, loading } = useQuery(SEE_BULLETIN_LIST, {
  //   variables: { announcement: announcement, classifyNum: classifyNum }
  // });
  const [action, setAction] = useState("nothing");

  const openBulletin = async postId => {
    if (action === "nothing") {
      await setAction(postId);
    } else if (action !== "nothing") {
      await setAction(postId);
    }
  };

  console.log(action + "리스트 프리젠터");

  // const openBulletin = async (postId, event) => {
  //   if (event) {
  //     await setAction(postId);
  //   }
  //   console.log(postId);
  // };

  return (
    <BulletinListPresenter
      id={id}
      classifyNum={classifyNum}
      posts={posts}
      openBulletin={openBulletin}
      action={action}
      // id={id}
      // title={title}
      // isViewed={isViewed}
      // likesCount={likesCount}
      // viewsCount={viewsCount}
      // classifyNum={classifyNum}
      // createdAt={createdAtParsed(createdAt)}
      // togglePost={togglePost}
      // classifyAction={classifyAction}
      // setAction={setAction}
      // loading={loading}
      // data={data}
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

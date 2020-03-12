import React, { useState } from "react";
import BulletinList from "../Components/BulletinList";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Helmet from "react-helmet";
import EditPost from "../Components/EditPost";
import Button from "../Components/Button/Button";
import { BREAK_POINT_MOBILE } from "../utils/mediaQuery";

const SEE_FULL_BULLETIN_LIST = gql`
  {
    seeFullBulletinList {
      id
      classifyNum
      posts {
        id
        title
        author {
          id
        }
        main
        announcement
        isViewed
        likesCount
        viewsCount
        classifyNum
        createdAt
      }
    }
  }
`;

const BulletinContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    padding: 3px 10px;
  }
`;
const BulletinListContainer = styled.div`
  display: flex;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  width: 100%;
`;

const ButtonDownContainer = styled.span`
  width: 100px;
  height: 50px;
  margin: 10px;
`;

export default withRouter(
  ({
    match: {
      params: { id }
    }
  }) => {
    const [edit, setEdit] = useState("read");
    const [editId, setEditId] = useState("");
    const { refetch, data, loading } = useQuery(SEE_FULL_BULLETIN_LIST);
    return (
      <BulletinContainer>
        <Helmet>
          <title>게시판 | Originals</title>
        </Helmet>
        <ButtonContainer>
          {edit === "read" && (
            <ButtonDownContainer>
              <Button text={"글 쓰기"} onClick={() => setEdit("write")} />
            </ButtonDownContainer>
          )}
          {edit === "read" && editId !== "" && (
            <ButtonDownContainer>
              <Button text={"글 수정"} onClick={() => setEdit("edit")} />
            </ButtonDownContainer>
          )}
        </ButtonContainer>
        <BulletinListContainer>
          {edit === "read" && loading && <Loader />}
          {edit === "read" &&
            !loading &&
            data &&
            data.seeFullBulletinList &&
            data.seeFullBulletinList.map(bulletinList => (
              <BulletinList
                key={bulletinList.id}
                id={bulletinList.id}
                classifyNum={bulletinList.classifyNum}
                posts={bulletinList.posts.sort(function(a, b) {
                  return a.createdAt > b.createdAt
                    ? -1
                    : a.createdAt < b.createdAt
                    ? 1
                    : 0;
                })}
                setEditId={setEditId}
                userId={id}
              />
            ))}
        </BulletinListContainer>
        {/* {edit === "write" && loadingMe && <Loader />} */}
        {edit === "write" && (
          <EditPost postId={"write"} setEdit={setEdit} refetch={refetch} />
        )}
        {edit === "edit" && (
          <EditPost postId={editId} setEdit={setEdit} refetch={refetch} />
        )}
      </BulletinContainer>
    );
  }
);

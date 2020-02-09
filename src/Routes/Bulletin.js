import React from "react";
import BulletinList from "../Components/BulletinList";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Helmet from "react-helmet";

const SEE_FULL_BULLETIN_LIST = gql`
  {
    seeFullBulletinList {
      id
      classifyNum
      posts {
        id
        title
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
  display: flex;
`;

export default () => {
  const { data, loading } = useQuery(SEE_FULL_BULLETIN_LIST);
  console.log(data);
  return (
    <BulletinContainer>
      <Helmet>
        <title>게시판 | Originals</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFullBulletinList &&
        data.seeFullBulletinList.map(bulletinList => (
          <BulletinList
            key={bulletinList.id}
            id={bulletinList.id}
            classifyNum={bulletinList.classifyNum}
            posts={bulletinList.posts}
          />
        ))}
    </BulletinContainer>
  );
};

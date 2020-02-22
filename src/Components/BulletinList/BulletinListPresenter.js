import React from "react";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
// import TextareaAutoSize from "react-autosize-textarea";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Bulletin from "../Bulletin";
import BulletinLine from "../BulletinLine";

const TabContainer = styled(Tabs)`
  width: 370px;
  height: 80vh;
  font-size: 10pt;
`;

export default ({ posts, action, openBulletin }) => {
  return (
    <>
      <TabContainer>
        <TabList>
          <Tab>전체</Tab>
          <Tab>공지사항</Tab>
          <Tab>가입인사</Tab>
          <Tab>익명게시판</Tab>
        </TabList>

        <TabPanel>
          {posts.map(post => (
            <BulletinLine post={post} openBulletin={openBulletin} />
          ))}
        </TabPanel>

        <TabPanel>
          {posts.map(post =>
            post.classifyNum === 1 ? (
              <BulletinLine post={post} openBulletin={openBulletin} />
            ) : null
          )}
        </TabPanel>
        <TabPanel>
          {posts.map(post =>
            post.classifyNum === 2 ? (
              <BulletinLine post={post} openBulletin={openBulletin} />
            ) : null
          )}
        </TabPanel>
        <TabPanel>
          {posts.map(post =>
            post.classifyNum === 3 ? (
              <BulletinLine post={post} openBulletin={openBulletin} />
            ) : null
          )}
        </TabPanel>
      </TabContainer>
      {action !== "nothing" ? <Bulletin postId={action} /> : null}
    </>
  );
};

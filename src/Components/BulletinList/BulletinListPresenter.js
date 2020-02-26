import React from "react";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
// import TextareaAutoSize from "react-autosize-textarea";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Bulletin from "../Bulletin";
import BulletinLine from "../BulletinLine";
import { BREAK_POINT_MOBILE } from "../../utils/mediaQuery";

const TabContainer = styled(Tabs)`
  min-width: 370px;
  height: 80vh;
  font-size: 10pt;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    ${props => {
      if (props.action !== "nothing") {
        return "display:none";
      }
    }}
`;

export default ({ posts, action, openBulletin, setAction }) => {
  console.log(action);
  return (
    <>
      <TabContainer action={action}>
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
      {action !== "nothing" ? (
        <Bulletin postId={action} setAction={setAction} />
      ) : null}
    </>
  );
};

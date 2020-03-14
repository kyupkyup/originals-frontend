import React from "react";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
// import TextareaAutoSize from "react-autosize-textarea";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Bulletin from "../Bulletin";
import BulletinLine from "../BulletinLine";
import EmptyBulletin from "../Bulletin/EmptyBulletin";
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

export default ({ posts, action, setAction, userId, setEditId }) => {
  return (
    <>
      <TabContainer action={action}>
        <TabList>
          <Tab>전체</Tab>
          <Tab>공지사항</Tab>
          <Tab>가입인사</Tab>
          <Tab>자유글</Tab>
        </TabList>

        <TabPanel>
          {posts
            .filter(post => post.announcement === true)
            .map(post => {
              return (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              );
            })}
          {posts
            .filter(post => post.announcement === false)
            .map(post => {
              return (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              );
            })}
        </TabPanel>

        <TabPanel>
          {posts
            .filter(post => post.announcement === true)
            .map(post =>
              post.classifyNum === "공지사항" ? (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              ) : null
            )}
          {posts
            .filter(post => post.announcement === false)
            .map(post =>
              post.classifyNum === "공지사항" ? (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              ) : null
            )}
        </TabPanel>
        <TabPanel>
          {posts
            .filter(post => post.announcement === true)
            .map(post =>
              post.classifyNum === "가입인사" ? (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              ) : null
            )}
          {posts
            .filter(post => post.announcement === false)
            .map(post =>
              post.classifyNum === "가입인사" ? (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              ) : null
            )}
        </TabPanel>
        <TabPanel>
          {posts
            .filter(post => post.announcement === true)
            .map(post =>
              post.classifyNum === "자유글" ? (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              ) : null
            )}
          {posts
            .filter(post => post.announcement === false)
            .map(post =>
              post.classifyNum === "자유글" ? (
                <BulletinLine
                  post={post}
                  setEditId={setEditId}
                  userId={userId}
                  action={action}
                  setAction={setAction}
                />
              ) : null
            )}
        </TabPanel>
      </TabContainer>
      {action !== "nothing" ? (
        <Bulletin postId={action} setAction={setAction} />
      ) : (
        <EmptyBulletin loading={false} />
      )}
    </>
  );
};

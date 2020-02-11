import React from "react";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
// import TextareaAutoSize from "react-autosize-textarea";
import FatText from "../FatText";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Bulletin from "../Bulletin";
import { HeartFull, ViewIcon } from "../Icons";

const TabContainer = styled(Tabs)`
  width: 370px;
  height: 80vh;
  font-size: 10pt;
  
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  flex-direction: row;
  ${props => props.theme.border}
`;

const ContainerDivider = styled.div`
  display: flex;
  &:first-child {
    width: 60%;
    text-align: left;
    padding: 10px;
  }
  &:last-child {
    width: 40%;

    padding: 10px;
    text-align: right;
  }
`;

const Title = styled(FatText)`
  padding: 10px;
  cursor: pointer;
`;

const ViewContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const HeartContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const View = styled(FatText)`
  align-items: center;
  margin: 0 10px;
  padding: 5px 0;
`;

const Like = styled(FatText)`
  align-items: center;
  margin: 0 10px;
  padding: 5px 0;
`;

export default ({ posts, action, openBulletin }) => {
  console.log(action);
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
            <Container key={post.id}>
              <ContainerDivider>
                <Title
                  text={post.title}
                  onClick={() => openBulletin(post.id)}
                />
              </ContainerDivider>
              <ContainerDivider>
                <ViewContainer>
                  <ViewIcon />
                  <View text={String(post.viewsCount)} />
                </ViewContainer>
                <HeartContainer>
                  <HeartFull />
                  <Like text={post.likesCount + "개"} />
                </HeartContainer>
              </ContainerDivider>
            </Container>
          ))}
        </TabPanel>

        <TabPanel>
          {posts.map(post => (
            <Container key={post.id}>
              <ContainerDivider>
                <Title text={post.title} />
              </ContainerDivider>
              <ContainerDivider>
                <ViewContainer>
                  <ViewIcon />
                  <View text={String(post.viewsCount)} />
                </ViewContainer>
                <HeartContainer>
                  <HeartFull />
                  <Like text={post.likesCount + "개"} />
                </HeartContainer>
              </ContainerDivider>
            </Container>
          ))}
        </TabPanel>
        <TabPanel>
          {posts.map(post => (
            <Container key={post.id} showing={post.classifyNum === 2}>
              <ContainerDivider>
                <Title text={post.title} />
              </ContainerDivider>
              <ContainerDivider>
                <ViewContainer>
                  <ViewIcon />
                  <View text={String(post.viewsCount)} />
                </ViewContainer>
                <HeartContainer>
                  <HeartFull />
                  <Like text={post.likesCount + "개"} />
                </HeartContainer>
              </ContainerDivider>
            </Container>
          ))}
        </TabPanel>
        <TabPanel>
          {posts.map(post => (
            <Container key={post.id} showing={post.classifyNum === 3}>
              <ContainerDivider>
                <Title text={post.title} />
              </ContainerDivider>
              <ContainerDivider>
                <ViewContainer>
                  <ViewIcon />
                  <View text={String(post.viewsCount)} />
                </ViewContainer>
                <HeartContainer>
                  <HeartFull />
                  <Like text={post.likesCount + "개"} />
                </HeartContainer>
              </ContainerDivider>
            </Container>
          ))}
        </TabPanel>
      </TabContainer>
      {action !== "nothing" ? <Bulletin postId={action} /> : null}
    </>
  );
};

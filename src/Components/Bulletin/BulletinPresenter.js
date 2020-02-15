import React, { useState } from "react";
import styled from "styled-components";
import "react-tabs/style/react-tabs.css";
import TextareaAutoSize from "react-autosize-textarea";
// import TextareaAutoSize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";

const BulletinContainer2 = styled.div`
  ${props => props.theme.whiteBox}
  width: 650px;
  height: 80vh;
  overflow-y: auto;
  margin-left: 20px;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 10px;
  display: flex;

  align-items: center;
  margin: 10px;
  width: 100%;
  max-width: 580px;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;
const Classes = styled.span`
  display: block;
  margin-top: 7px;
  font-size: 12px;
`;
const TitleContainer = styled.div`
  margin-left: 10px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 60px;
`;

const Title = styled(FatText)`
  font-size: 12pt;
`;
const Main = styled.div`
  padding: 10px;
  margin: 0 10px;
  font-size: 9pt;
`;
const Files = styled.div`
  margin: 0 10px;
  padding: 10px;
`;

const File = styled.div``;

const Metas = styled.span``;

const Meta = styled.div`
  margin: 0 10px;
  padding: 10px;
  ${Metas} {
    &:first-child {
      margin-right: 10px;
    }
  }
`;
const MetaText = styled(FatText)`
  margin-left: 5px;
  font-size: 13pt;
`;

const Button = styled.span``;

const TimeStamp = styled.span`
  margin-left: 10px;
  font-size: 8pt;
  color: ${props => props.theme.lightGray1};
`;

const Textarea = styled(TextareaAutoSize)`
  margin-left: 10px;
  border: none;
  width: 90%;
  &:focus {
    outline: none;
  }
  resize: none;
  font-size: 16px;
  background-color: #e1e8ed;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const Comments = styled.ul`
  margin-top: 10px;
  margin-left: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

export default ({
  id,
  files,
  author,
  classifyNum,
  main,
  announcement,
  title,
  caption,
  isLiked,
  viewsCount,
  likesCount,
  commentsCount,
  views,
  likes,
  comments,
  createdAt,
  toggleLike,
  onKeyPress,
  newComment
}) => {
  console.log(createdAt);
  return (
    <BulletinContainer2>
      <Header>
        <Avatar size="md" url={author.avatar} className="" />
        <UserColumn>
          <Link to={`/${author.email}`}>
            <FatText text={author.userName} />
          </Link>
          <Classes>
            {author.classes === 1
              ? "신입회원"
              : author.classes === 2
              ? "일반회원"
              : "정회원"}
          </Classes>
        </UserColumn>
      </Header>
      <TitleContainer>
        <Title text={title} />
      </TitleContainer>
      <Main>{caption}</Main>
      <Files>
        {files && files.map(file => <File key={file.id} src={file.url} />)} 　
      </Files>
      <Meta>
        <Metas>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <MetaText text={likesCount + ""} />
        </Metas>
        <Metas>
          <CommentIcon />
          <MetaText text={commentsCount + ""} />
        </Metas>
      </Meta>
      <TimeStamp>{createdAt + ""}</TimeStamp>

      {comments && (
        <Comments>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <FatText text={comment.user.userName + ""} />
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
      <Textarea
        placeholder={"댓글을 입력하세요."}
        value={newComment.value}
        onChange={newComment.onChange}
        onKeyPress={onKeyPress}
      ></Textarea>
    </BulletinContainer2>
  );
};

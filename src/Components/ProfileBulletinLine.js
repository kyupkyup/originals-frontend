import React from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import FatText from "./FatText";
import { ViewIcon, HeartFull } from "./Icons";
import { useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { Announce } from "./Icons";
const Animation = keyframes`
    0%{
        opacity:1
    }
    3%{
        opacity:0.3
    }
    100%{
        opacity:0.3
    }
`;
const VIEW = gql`
  mutation togglePost($postId: String!) {
    togglePost(postId: $postId)
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-top: 0.5px solid ${props => props.theme.lightGray3}
  border-bottom: 0.5px solid ${props => props.theme.lightGray3}
  margin-bottom:5px;
`;

const AnnounceContainer = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
`;

const ContainerDivider = styled.div`
  display: flex;
  &:first-child {
    width: 60%;
    text-align: left;
    padding: 10px;
    align-items: center;
  }
  &:last-child {
    width: 40%;

    padding: 10px;
    text-align: right;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Title = styled(FatText)`
  &:hover {
    animation: ${Animation} 10s linear infinite;
  }
  padding: 10px;
  cursor: pointer;
  ${props => {
    if (props.action === "main") {
      return "cursor:none;";
    }
  }}
`;

const ViewContainer = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;
`;

const HeartContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const View = styled(FatText)`
  margin: 0 10px;
  padding: 5px 0;
`;

const Like = styled(FatText)`
  margin: 0 10px;
  padding: 5px 0;
`;

const ProfileBulletinLine = ({ post, action, setAction }) => {
  const [togglePostMutation] = useMutation(VIEW, {
    variables: { postId: post.id }
  });
  const openBulletin = async () => {
    setAction(post.id);
    await togglePostMutation();
  };
  return (
    <Container>
      <AnnounceContainer>
        {post.announcement ? <Announce /> : null}
      </AnnounceContainer>

      <TitleContainer>
        <Title text={post.title} onClick={() => openBulletin()} />
      </TitleContainer>
      <ContainerDivider>
        <HeartContainer>
          <HeartFull />
          <Like text={post.likesCount + "개"} />
        </HeartContainer>
        <ViewContainer>
          <ViewIcon />
          <View text={String(post.viewsCount)} />
        </ViewContainer>
      </ContainerDivider>
    </Container>
  );
};

ProfileBulletinLine.propTypes = {
  post: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          userName: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          classes: PropTypes.number.isRequired
        })
      ),
      viewsCount: PropTypes.number,
      likesCount: PropTypes.number
    })
  )
};
export default ProfileBulletinLine;

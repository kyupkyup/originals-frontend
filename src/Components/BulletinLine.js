import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "./FatText";
import { ViewIcon, HeartFull } from "./Icons";
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

const BulletinLine = ({ post, openBulletin }) => {
  return (
    <Container>
      <ContainerDivider>
        <Title text={post.title} onClick={() => openBulletin(post)} />
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
  );
};

BulletinLine.propTypes = {
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
export default BulletinLine;

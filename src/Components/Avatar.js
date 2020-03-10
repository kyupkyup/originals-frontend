import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const getSize = size => {
  let number;
  if (size === "sm") {
    number = 30;
  } else if (size === "md") {
    number = 50;
  } else if (size === "lg") {
    number = 150;
  }
  return `
    width:${number}px;
    height:${number}px;
`;
};

const Container = styled.div`
  ${props => getSize(props.size)};
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
  border:0.5px solid ${props => props.theme.lightGray3}
  margin-right: 10px;
`;

const Avatar = ({ size, url, className, onClick }) => (
  <Container className={className} size={size} url={url} onClick={onClick} />
);

Avatar.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Avatar;

import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DropdownArrow } from "../Icons";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  border-top: 0.5px solid ${props => props.theme.lightGray3};
  border-bottom: 0.5px solid ${props => props.theme.lightGray3};
  color: black;
  justify-content: center;
  cursor: pointer;
`;
const Title = styled.span`
  padding: 15px 0px;
  margin-right: 5px;
  font-size: 13px;
`;

const DropdownButton = ({ onClick, title, participantsCount }) => (
  <Container onClick={onClick}>
    <Title>
      {title} 참가자({participantsCount} 명)
    </Title>
    <DropdownArrow />
  </Container>
);

DropdownButton.propTypes = {
  title: PropTypes.string.isRequired
};

export default DropdownButton;

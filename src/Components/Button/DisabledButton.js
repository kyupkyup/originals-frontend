import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.button`
  width: 100%;
  height: 35px;

  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.lightGray1};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ text, onClick }) => (
  <Container onClick={onClick} disabled>
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

export default Button;

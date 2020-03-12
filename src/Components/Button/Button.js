import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.darkBlueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const Button = ({ text, onClick, loading }) => (
  <Container onClick={onClick} loading={loading}>
    {loading ? <Spinner as="span" size="sm" animation="border" /> : null}
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool
};

export default Button;

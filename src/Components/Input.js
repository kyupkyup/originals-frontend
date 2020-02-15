import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const InputType = styled.input`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.lightGray5};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
`;

const Input = ({
  placeholder,
  className,
  value,
  onChange,
  type = "text",
  disabled = false
}) => (
  <InputType
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    type={type}
    disabled={disabled}
  />
);
Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default Input;

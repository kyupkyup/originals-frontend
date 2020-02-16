import * as React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TextareaType = styled.textarea`
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.lightGray5};
  font-size: 12px;
  padding: 15px;
`;

const Textarea = ({
  placeholder,
  className,
  value,
  onChange,
  type = "text",
  disabled = false
}) => (
  <TextareaType
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    type={type}
    disabled={disabled}
  />
);
Textarea.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default Textarea;

import React from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import PropTypes from "prop-types";
import { BREAK_POINT_MOBILE } from "../utils/mediaQuery";

const DropdownM = styled(Dropdown)`
  width: 200px;
  margin-right: 10px;
  @media (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 200px;
  }
`;

const DropdownCompo = ({ options, setDefaultOptions, defaultOption }) => {
  const handleChange = defaultOption => {
    setDefaultOptions(defaultOption.value);
    console.log(defaultOption.value);
  };
  console.log(defaultOption);
  return (
    <DropdownM
      value={defaultOption}
      options={options}
      onChange={defaultOption => handleChange(defaultOption)}
      placeholder={"선택"}
    />
  );
};

DropdownCompo.propTypes = {
  options: PropTypes.array,
  setDefaultOptions: PropTypes.func,
  defaultOption: PropTypes.string.isRequired
};

export default DropdownCompo;

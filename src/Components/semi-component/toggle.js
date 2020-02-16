import React from "react";
import { Checkbox } from "semantic-ui-react";

const CheckboxToggle = ({ onClick, checked }) => (
  <Checkbox toggle defaultChecked={checked} onClick={onClick} />
);

export default CheckboxToggle;

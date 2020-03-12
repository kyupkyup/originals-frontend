import React from "react";
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {
  return (
    <div className="sweet-loading">
      <RingLoader css={override} size={60} color={"#0E5A8A"} loading={true} />
    </div>
  );
};
export default Loader;

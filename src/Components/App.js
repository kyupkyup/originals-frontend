import React from "react";
import { gql } from "apollo-boost";

import { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import { useQuery } from "react-apollo-hooks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Theme from "../Styles/Theme";
import { HashRouter as Router } from "react-router-dom";
import styled from "styled-components";
import AppRouter from "./Router";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  width: 100%;
  height: auto;
`;

export default () => {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  console.log(isLoggedIn);
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <Wrapper>
            <AppRouter isLoggedIn={isLoggedIn} />
          </Wrapper>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};

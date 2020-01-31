import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloProvider } from "react-apollo-hooks";
import Client from "./Apollo/Client"
// import "~normalize.css";
// import "~@blueprintjs/core/lib/css/blueprint.css";
// import "~@blueprintjs/icons/lib/css/blueprint-icons.css";

ReactDOM.render(
  <ApolloProvider client={Client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);


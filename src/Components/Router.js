import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Main from "../Routes/Main";
import Bulletin from "../Routes/Bulletin";
import Profile from "../Routes/Profile";
import Book from "../Routes/Book";
import Meeting from "../Routes/Meeting";
import Header from "../Components/Header";

const LoggedInRoutes = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/Bulletin/:id" component={Bulletin} />
      <Route path="/Book" component={Book} />
      <Route path="/Meeting/:id" component={Meeting} />
      <Route path="/Profile/:email" component={Profile} />
      <Redirect from="*" to="/" />
    </Switch>
  </>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;

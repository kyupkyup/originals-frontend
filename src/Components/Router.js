import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Main from "../Routes/Main";
import Bulletin from "../Routes/Bulletin"
import Profile from "../Routes/Bulletin"

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/Bulletin" component={Bulletin} />
    <Route exact path="/Profile" component={Profile} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth}/>
    
  </Switch>
);

const AppRouter = ({ isLoggedIn }) => (
   isLoggedIn ? <LoggedInRoutes/> : <LoggedOutRoutes /> 
);

AppRouter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppRouter;
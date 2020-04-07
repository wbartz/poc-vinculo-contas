import React from "react";
import { Loader } from "react-overlay-loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Login = React.lazy(() => import("./login"));
const Main = React.lazy(() => import("./App"));
const Profile = React.lazy(() => import("./profile"));

const Routes = () => (
  <Router>
    <React.Suspense fallback={<Loader loading fullPage text="" />}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </React.Suspense>
  </Router>
);

export default Routes;

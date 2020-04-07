import React, { useContext } from "react";
import { Loader } from "react-overlay-loader";
import { withRouter } from "react-router";
import "./App.css";
import { AppContext } from "./context/StoreProvider";
import logo from "./logo.svg";

const App = ({ history, userLoginFacebook, userLoginGoogle, isLoading }) => {
  const onSuccess = () => history.push("profile");

  const handleFacebookLogin = async () => await userLoginFacebook(onSuccess);
  const handleGoogleLogin = async () => await userLoginGoogle(onSuccess);

  return (
    <div className="App">
      <Loader loading={isLoading} fullPage text="" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          onClick={handleFacebookLogin}
          className="App-link facebook"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login com facebook
        </a>
        <a className="App-link google" onClick={handleGoogleLogin}>
          Login com google
        </a>
        <a className="App-link email" href="/login">
          Login com e-mail
        </a>
      </header>
    </div>
  );
};

export default withRouter(props => <App {...useContext(AppContext)} {...props} />);

import React, { useContext } from "react";
import { withRouter } from "react-router";
import "./App.css";
import { AppContext } from "./context/StoreProvider";
import logo from "./logo.svg";

const App = ({ history, userLoginFacebook }) => {
  const onSuccess = () => history.push("profile");

  const handleFacebookLogin = async () => await userLoginFacebook(onSuccess);

  return (
    <div className="App">
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
        <a className="App-link email" href="/login">
          Login com e-mail
        </a>
      </header>
    </div>
  );
};

export default withRouter(props => <App {...useContext(AppContext)} {...props} />);

import React, { useContext } from "react";
import { Loader } from "react-overlay-loader";
import { withRouter } from "react-router";
import "./App.css";
import { AppContext } from "./context/StoreProvider";
import Form from './form';
import logo from "./logo.svg";

const Login = ({ userLogin, isLoading, history }) => {
  
  const onSuccess = () => history.push("/profile");

  const handleLogin = async (username, password) =>
    await userLogin(username, password, onSuccess);

  return (
    <div className="App">
      <Loader loading={isLoading} fullPage text="" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form handleSubmit={handleLogin} />
      </header>
    </div>
  );
};

export default withRouter(props => (
  <Login {...useContext(AppContext)} {...props} />
));

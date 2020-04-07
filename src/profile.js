import React, { useContext, useEffect, useState } from "react";
import { Loader } from "react-overlay-loader";
import { withRouter } from "react-router";
import "./App.css";
import { AppContext } from "./context/StoreProvider";
import Form from "./form";
import logo from "./logo.svg";
import { getCookie } from "./utils";

const Profile = ({
  history,
  userLogout,
  linkWithFacebook,
  linkWithEmail,
  linkWithGoogle,
  isLoading,
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoad] = useState(false);
  const [hasData, setData] = useState(false);
  const [linked, setLinked] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoad(true);
      setUser(JSON.parse(getCookie("user")));
      setLoad(false);
    };

    if (!hasData) {
      getUser();
      setData(true);
    }
  }, [user, hasData]);

  useEffect(() => {
    if (linked) {
      setTimeout(() => setLinked(false), 3000);
    }
  }, [linked]);

  const onLogout = () => history.push("/");

  const handleLogout = async () => await userLogout(onLogout);

  const handleLink = async () => await linkWithFacebook(setUser, setLinked);

  const handleLinkEmail = async (username, password) =>
    await linkWithEmail(username, password, setUser, setLinked).then(() =>
      setShowForm(false)
    );
  
  const handleLinkGoogle = async () => await linkWithGoogle(setUser, setLinked);

  return (
    <div className="App">
      <Loader
        loading={isLoading || loading}
        fullpage
        text="Buscando dados do usuário"
      />

      <header className="App-header">
        <img src={logo} alt="logo" className="App-logo" />

        <div className="profile">
          <span className="uid">
            <strong>UID: </strong>
            {user?.uid}
          </span>
          <span className="name">
            <strong>Nome: </strong>
            {user?.displayName}
          </span>
          <span className="email">
            <strong>E-mail: </strong>
            {user?.email}
          </span>
          <span className="providers">
            <strong>Providers: </strong>{" "}
            <span>
              {user?.providerData.map((provider) => `${provider.providerId} `)}
            </span>
          </span>

          {linked && (
            <span className="error">Essa conta já está vinculada!</span>
          )}
          {user ? (
            <div className="buttons">
              <button className="facebook" onClick={handleLink} type="button">
                Vincular Facebook
              </button>

              <button
                className="google"
                type="button"
                onClick={handleLinkGoogle}
              >
                Vincular Google
              </button>

              {showForm ? <Form handleSubmit={handleLinkEmail} /> : null}

              <button
                className="email"
                onClick={() => setShowForm(!showForm)}
                type="button"
              >
                Vincular E-mail
              </button>

              <button className="exit" onClick={handleLogout} type="button">
                Sair
              </button>
            </div>
          ) : null}
        </div>
      </header>
    </div>
  );
};

export default withRouter((props) => (
  <Profile {...useContext(AppContext)} {...props} />
));

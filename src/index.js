import React from "react";
import ReactDOM from "react-dom";
import "react-overlay-loader/styles.css";
import StoreProvider from "./context/StoreProvider";
import "./index.css";
import App from "./routes";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

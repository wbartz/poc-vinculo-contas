import firebase from "firebase";
import auth from "../auth";
import { removeCookie, setCookie } from "../utils";

export const USER_REQUEST_START = "USER_REQUEST_START";
export const USER_REQUEST_SUCCESS = "USER_REQUEST_SUCCESS";
export const USER_REQUEST_FAILURE = "USER_REQUEST_FAILURE";

export const userLogin = (username, password, onSuccess) => async (
  dispatch
) => {
  dispatch({ type: USER_REQUEST_START });

  await auth
    .signInWithEmailAndPassword(username, password)
    .then((result) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
        data: result.user,
      });
      setCookie("user", result.user);
      return onSuccess();
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USER_REQUEST_FAILURE,
        error,
      });
    });
};

export const userLoginFacebook = (onSuccess) => async (dispatch) => {
  dispatch({ type: USER_REQUEST_START });

  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  await auth
    .signInWithPopup(facebookProvider)
    .then((result) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
        data: result.user,
      });
      setCookie("user", result.user);
      return onSuccess();
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USER_REQUEST_FAILURE,
        error,
      });
    });
};

export const userLoginGoogle = (onSuccess) => async dispatch => {
  dispatch({ type: USER_REQUEST_START });

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  await auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
        data: result.user,
      });
      setCookie("user", result.user);
      return onSuccess();
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: USER_REQUEST_FAILURE,
        error,
      });
    });
}

export const userLogout = (onSuccess) => async (dispatch) => {
  dispatch({ type: USER_REQUEST_START });

  await auth
    .signOut()
    .then(() => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
      });
      removeCookie("user");
      return onSuccess();
    })
    .catch((error) => {
      dispatch({
        type: USER_REQUEST_FAILURE,
        error,
      });
    });
};

export const linkWithFacebook = (onSuccess, onError) => async (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();

  dispatch({ type: USER_REQUEST_START });

  await auth.currentUser
    .linkWithPopup(provider)
    .then((result) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
      });
      return onSuccess(result.user);
    })
    .catch((error) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
      });
      if (error.code === "auth/provider-already-linked") return onError(true);
    });
};

export const linkWithEmail = (username, password, onSuccess, onError) => async (
  dispatch
) => {
  const credential = new firebase.auth.EmailAuthProvider.credential(
    username,
    password
  );

  dispatch({ type: USER_REQUEST_START });

  await auth.currentUser
    .linkWithCredential(credential)
    .then((result) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
      });
      return onSuccess(result.user);
    })
    .catch((error) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
      });
      if (error.code === "auth/provider-already-linked") return onError(true);
    });
};

export const linkWithGoogle = (onSuccess, onError) => async (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();

  dispatch({ type: USER_REQUEST_START });

  await auth.currentUser
    .linkWithPopup(provider)
    .then((result) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
      });
      return onSuccess(result.user);
    })
    .catch((error) => {
      dispatch({
        type: USER_REQUEST_SUCCESS,
      });
      if (error.code === "auth/provider-already-linked") return onError(true);
    });
};

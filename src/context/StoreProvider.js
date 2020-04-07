import React, { createContext, useReducer } from 'react';
import * as appActions from './actions';
import appReducers, { initialState } from './reducer';

const useActions = (actions, dispatch) =>
  Object.entries(actions)
    .filter(([, action]) => action.constructor === Function)
    .reduce(
      (acc, [index, action]) => ({
        ...acc,
        [index]: (...args) => action(...args)(dispatch),
      }),
      {}
    );

const CreateProviderValue = (reducer, initialState, actions) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const boundActions = useActions(actions, dispatch);

  return { ...boundActions, ...state };
};

export const AppContext = createContext();

const StoreProvider = ({children}) => {
  return (
    <AppContext.Provider
    value={CreateProviderValue(appReducers, initialState, appActions)}
    >{children}</AppContext.Provider>
  )
}

export default StoreProvider;
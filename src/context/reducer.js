import { USER_REQUEST_FAILURE, USER_REQUEST_START, USER_REQUEST_SUCCESS } from "./actions";

export const initialState = {
  isLoading: false,
  user: null,
  error: null
};

export default (state = initialState, { type, ...action }) => {
  switch (type) {
    case USER_REQUEST_START:
      return {
        ...state,
        isLoading: true
      };
    case USER_REQUEST_SUCCESS:
      return {
        ...state,
        user: action.data,
        isLoading: false
      };
    case USER_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

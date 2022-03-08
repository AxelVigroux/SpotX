import {
  LOGOUT_USER,
  LOGGED_IN_USER,
  USER_GET_POSITION,
} from "./actions-types";

export const logged_in_user = (user) => {
  return function (dispatch) {
    dispatch({
      type: LOGGED_IN_USER,
      payload: user,
    });
  };
};

export const user_get_position = (position) => {
  return function (dispatch) {
    dispatch({
      type: USER_GET_POSITION,
      payload: position,
    });
  };
};

export const logoutUser = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER,
      payload: null,
    });
  };
};

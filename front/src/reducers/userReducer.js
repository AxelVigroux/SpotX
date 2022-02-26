import { LOGGED_IN_USER, USER_GET_POSITION, LOGOUT_USER } from "../actions/users/actions-types";

const initialState = {
  isLogged: false,
  infos: null,
  position: []
};


const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_USER:
      return { ...state, infos: action.payload, isLogged: true };

    case USER_GET_POSITION:
      return { ...state, position: action.payload }

    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;

import { GET_ALL_SPOTS } from "../actions/spots/actions-types";

const initialState = {
  spots: [],
};

const SpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS:
      return { ...state, spots: action.payload };
    default:
      return state;
  }
};

export default SpotReducer;

import { GET_ALL_SPOTS } from "./actions-types";

export const get_all_spot = (spots) => {
  return function (dispatch) {
    dispatch({
      type: GET_ALL_SPOTS,
      patload: spots,
    });
  };
};

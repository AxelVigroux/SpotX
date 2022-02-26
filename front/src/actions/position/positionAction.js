import { GET_MY_POSITION } from "./actions-types"

export const get_my_position = (position) => {
  return function (dispatch) {
    dispatch({
      type: GET_MY_POSITION,
      payload: position,
    })
  }
}
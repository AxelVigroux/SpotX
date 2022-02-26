import { GET_MY_POSITION } from "../actions/position/actions-types"

const initialState = {
  coords: null
}

const PositionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_POSITION:
      return { ...state, coords: action.payload }

    default:
      return state;
  }
}

export default PositionReducer
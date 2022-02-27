import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import PositionReducer from "./positionReducer"
import SpotReducer from "./spotReducer"

const rootReducer = combineReducers({
  user: UserReducer,
  position: PositionReducer,
  spots: SpotReducer
});

export default rootReducer;

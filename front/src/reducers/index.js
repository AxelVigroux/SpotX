import { combineReducers } from "redux";
import UserReducer from "./userReducer";
import PositionReducer from "./positionReducer"

const rootReducer = combineReducers({
  user: UserReducer,
  position: PositionReducer
});

export default rootReducer;

import { combineReducers } from "redux";
import { User } from "./Reducers/User";
import { Resume } from "./Reducers/Resume";
import { Window } from "./Reducers/Window";

export const RootReducer = combineReducers({
  User,
  Resume,
  Window
});

import { userReducers } from "./reducers/userReducers";
import { createStore } from "redux";

export const configureStore = () => {
  return createStore(userReducers);
};

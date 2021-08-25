import { combineReducers } from "redux";
import ingredientsReducer from "./ingredientsReducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import ingredientsReducer from "./ingredientsReducer";
import dishesReducer from "./dishesReducer";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  dishes: dishesReducer,
});

export default rootReducer;

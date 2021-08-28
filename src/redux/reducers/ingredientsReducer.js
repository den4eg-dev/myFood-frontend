import {
  REMOVE_ITEM,
  SET_INGREDIENTS,
  SET_LOADING,
  SET_ONE_ITEM,
  SET_UPDATED_ITEM,
  ADD_ONE_INGREDIENT,
} from "../actions/ingredientsAction";

const initialState = {
  data: [],
  isLoading: false,
  oneItem: {},
};

const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      // console.log("ACTION", action.payload);
      return {
        ...state,
        data: action.payload,
      };
    case ADD_ONE_INGREDIENT:
      // Object.assign(state.data,data);
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case REMOVE_ITEM: {
      console.log("REDUCER", action.payload);

      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload),
      };
    }

    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_ONE_ITEM:
      return { ...state, oneItem: action.payload };

    case SET_UPDATED_ITEM:
      // console.log(action);
      return state;

    default:
      return state;
  }
};

export default ingredients;

import { SET_ALL_DISHES, SET_LOADING } from "../actions/dishesAction";

const initialState = {
  data: [],
  isLoading: false,
};

const dishes = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_DISHES:
      return {
        ...state,
        data: action.payload,
      };

    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default dishes;

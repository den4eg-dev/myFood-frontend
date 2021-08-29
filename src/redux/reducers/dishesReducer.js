import {
  ADD_ITEM_TO_DISH,
  ADD_ONE_DISH,
  REMOVE_DISH,
  REMOVE_ITEM_FROM_DISH,
  SET_ALL_DISHES,
  SET_LOADING,
  SET_ONE_DISH,
} from "../actions/dishesAction";

const initialState = {
  data: [],
  isLoading: false,
  selectedDish: {},
};

const dishes = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_DISHES:
      return {
        ...state,
        data: action.payload,
      };
    case SET_ONE_DISH:
      return {
        ...state,
        selectedDish: action.payload,
      };
    case REMOVE_DISH:
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.payload),
      };
    case ADD_ONE_DISH:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    case REMOVE_ITEM_FROM_DISH:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_ITEM_TO_DISH: {
      let newItem = action.payload;
      const foundIndex = state.data.findIndex(
        (item) => item._id === newItem._id
      );
      const newArr = [...state.data];
      newArr[foundIndex] = newItem;

      return { ...state, data: newArr };
    }
    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default dishes;

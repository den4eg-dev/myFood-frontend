import {
  REMOVE_ITEM,
  SET_INGREDIENTS,
  SET_LOADING,
  SET_ONE_ITEM,
  SET_UPDATED_ITEM,
} from "../consts";

const initialState = {
  data: [],
  isLoading: false,
  oneItem: {},
};

const ingredients = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        data: action.payload,
      };
    case REMOVE_ITEM: {
      // const newData = [...state.data];
      // // delete newData[action.payload];
      // console.log(newData);
      // const data = newData.map((item) => item._id !== action.payload._id);
      return { ...state, isLoading: action.payload };
    }

    case SET_LOADING:
      return { ...state, isLoading: action.payload };

    case SET_ONE_ITEM:
      return { ...state, oneItem: action.payload };

    case SET_UPDATED_ITEM:
      console.log(action);
      return state;

    default:
      return state;
  }
};

export default ingredients;

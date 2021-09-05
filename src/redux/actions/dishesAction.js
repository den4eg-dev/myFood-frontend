import {
  createDishes,
  deleteDishes,
  getAllDishes,
  updateDishes,
} from "../../api/dishesAPI";

export const SET_ALL_DISHES = "GET_ALL_DISHES";
export const SET_LOADING = "SET_LOADING";
export const REMOVE_ITEM_FROM_DISH = "REMOVE_ITEM_FROM_DISH";
export const REMOVE_DISH = "REMOVE_DISH";
export const ADD_ONE_DISH = "ADD_ONE_DISH";
export const ADD_ITEM_TO_DISH = "ADD_ITEM_TO_DISH";
export const SET_ONE_DISH = "SET_ONE_DISH";

export const fetchDishes = () => (dispatch) => {
  getAllDishes()
    .then((res) => {
      dispatch(setAllDishes(res));
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

export const createOneDish = (payload) => (dispatch) => {
  dispatch(setLoading(true));
  createDishes(payload)
    .then((res) => {
      dispatch(addOneDish(res));
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

export const deleteOneDish = (id) => (dispatch) => {
  dispatch(setLoading(true));
  deleteDishes(id)
    .then((res) => {
      dispatch(removeDish(id));
      dispatch(setLoading(false));
      console.log(res.message);
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

export const updateOneDish = (id, payload) => (dispatch) => {
  dispatch(setLoading(true));
  updateDishes(id, payload)
    .then((res) => {
      console.log("UPADaTE", res);
      dispatch(addItemToDish(res));
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

const setAllDishes = (payload) => ({
  type: SET_ALL_DISHES,
  payload,
});
const addOneDish = (payload) => ({
  type: ADD_ONE_DISH,
  payload,
});

export const setOneDish = (payload) => ({
  type: SET_ONE_DISH,
  payload,
});

const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});
const removeDish = (payload) => ({
  type: REMOVE_DISH,
  payload,
});

const addItemToDish = (payload) => ({
  type: ADD_ITEM_TO_DISH,
  payload,
});

// const removeItemFromDish = (payload) => ({
//   type: REMOVE_ITEM_FROM_DISH,
//   payload,
// });

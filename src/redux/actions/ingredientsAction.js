import {
  getIngredients,
  deleteIngredient,
  updateIngredient,
  createIngredient,
} from "../../api/ingridientsAPI";
import {
  REMOVE_ITEM,
  SET_INGREDIENTS,
  SET_LOADING,
  SET_ONE_ITEM,
  SET_UPDATED_ITEM,
} from "../consts";

export const fetchIngredients = (search) => (dispatch) => {
  dispatch(setLoading(false));
  getIngredients(search)
    .then((res) => {
      dispatch(setIngredients(res.data));
      // console.log(res.data);
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

export const deleteItem = (id) => (dispatch) => {
  // dispatch(removeIngredient(data));
  dispatch(setLoading(true));
  deleteIngredient(id)
    .then((res) => {
      dispatch(removeIngredient(id));
      dispatch(setLoading(false));
      console.log(res.message);
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.message || err);
    });
};

export const updateOneItem = (id, payload) => (dispatch) => {
  dispatch(setLoading(true));
  updateIngredient(id, payload)
    .then((res) => {
      console.log(res);
      dispatch(setUpdatedItem(res));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.message || err);
    });
};

export const CreateOneItem = (payload) => (dispatch) => {
  dispatch(setLoading(true));
  createIngredient(payload)
    .then((res) => {
      console.log(res);
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.message || err);
    });
};

const setUpdatedItem = (payload) => ({
  type: SET_UPDATED_ITEM,
  payload,
});

const setIngredients = (payload) => ({
  type: SET_INGREDIENTS,
  payload,
});

const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

const removeIngredient = (payload) => ({
  type: REMOVE_ITEM,
  payload,
});

export const setOneItemData = (payload) => ({
  type: SET_ONE_ITEM,
  payload,
});

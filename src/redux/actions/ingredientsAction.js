import {
  getIngredients,
  deleteIngredient,
  updateIngredient,
  createIngredient,
} from "../../api/ingridientsAPI";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_LOADING = "SET_LOADING";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SET_ONE_ITEM = "SET_ONE_ITEM";
export const SET_UPDATED_ITEM = "SET_UPDATED_ITEM";
export const ADD_ONE_INGREDIENT = " ADD_ONE_INGREDIENT";

export const fetchIngredients = (search, sortBy, page) => (dispatch) => {
  dispatch(setLoading(false));
  getIngredients(search, sortBy, page)
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
      console.log(res);
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
      console.log("ACTION", res);
      dispatch(addOneIngredient(res));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      console.log(err.message || err);
    });
};

const addOneIngredient = (payload) => ({
  type: ADD_ONE_INGREDIENT,
  payload,
});

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

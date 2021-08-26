import {
  createDishes,
  deleteDishes,
  getAllDishes,
  updateDishes,
} from "../../api/dishesAPI";

export const SET_ALL_DISHES = "GET_ALL_DISHES";
export const SET_LOADING = "SET_LOADING";

export const fetchDishes = () => (dispatch) => {
  getAllDishes()
    .then((res) => {
      dispatch(setAllDishes(res));
      // console.log(res);
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

export const createOneDish = (payload) => (dispatch) => {
  dispatch(setLoading(true));
  console.log("PAZLOAD", payload);
  createDishes(payload)
    .then(() => {
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

export const deleteOneDish = (id) => (dispatch) => {
  dispatch(setLoading(true));
  deleteDishes(id)
    .then((res) => {
      console.log(res.message);
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

export const updateOneDish = (id, payload) => (dispatch) => {
  dispatch(setLoading(true));
  updateDishes(id, payload)
    .then((res) => {
      console.log(res.message);
      dispatch(setLoading(false));
    })
    .catch((err) => console.log(err.message || err))
    .finally(() => dispatch(setLoading(false)));
};

const setAllDishes = (payload) => ({
  type: SET_ALL_DISHES,
  payload,
});

const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

// export const deleteItem = (id) => (dispatch) => {
//   // dispatch(removeIngredient(data));
//   dispatch(setLoading(true));
//   deleteIngredient(id)
//     .then((res) => {
//       dispatch(removeIngredient(id));
//       dispatch(setLoading(false));
//       console.log(res.message);
//     })
//     .catch((err) => {
//       dispatch(setLoading(false));
//       console.log(err.message || err);
//     });
// };
//
// export const updateOneItem = (id, payload) => (dispatch) => {
//   dispatch(setLoading(true));
//   updateIngredient(id, payload)
//     .then((res) => {
//       console.log(res);
//       dispatch(setUpdatedItem(res));
//       dispatch(setLoading(false));
//     })
//     .catch((err) => {
//       dispatch(setLoading(false));
//       console.log(err.message || err);
//     });
// };
//
// export const CreateOneItem = (payload) => (dispatch) => {
//   dispatch(setLoading(true));
//   createIngredient(payload)
//     .then((res) => {
//       console.log(res);
//       dispatch(setLoading(false));
//     })
//     .catch((err) => {
//       dispatch(setLoading(false));
//       console.log(err.message || err);
//     });
// };
//
// const setUpdatedItem = (payload) => ({
//   type: SET_UPDATED_ITEM,
//   payload,
// });
//
// const setIngredients = (payload) => ({
//   type: SET_INGREDIENTS,
//   payload,
// });
//
// const setLoading = (payload) => ({
//   type: SET_LOADING,
//   payload,
// });
//
// const removeIngredient = (payload) => ({
//   type: REMOVE_ITEM,
//   payload,
// });
//
// export const setOneItemData = (payload) => ({
//   type: SET_ONE_ITEM,
//   payload,
// });

import { $host } from "./index";

export const getAllDishes = async () => {
  const { data } = await $host.get(`dishes?sortBy=createdAt:desc`);
  // console.log("API", data);
  return data;
};

export const deleteDishes = async (id) => {
  const { data } = await $host.delete(`dishes/${id}`);
  return data;
};

export const createDishes = async (payload) => {
  const { data } = await $host.post("dishes", payload, {
    headers: {
      // "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
//
// export const updateIngredient = async (id, payload) => {
//   const { data } = await $host.put(`ingredients/${id}`, payload, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return data;
// };
//
// export const getOneIngredient = async (id) => {
//   const { data } = await $host.get("ingredients/" + id);
//   console.log(data);
//   return data;
// };
import { $host } from "./index";

export const getIngredients = async (
  search,
  sortBy = "createdAt:desc",
  page = 1,
  limit = 10
) => {
  const { data } = await $host.get(
    `ingredients?page=${page}&limit=${limit}&searchByName=${search}&sortBy=${sortBy}`
  );
  return data;
};

export const deleteIngredient = async (id) => {
  const { data } = await $host.delete(`ingredients/${id}`);
  return data;
};

export const createIngredient = async (payload) => {
  const { data } = await $host.post("ingredients", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateIngredient = async (id, payload) => {
  const { data } = await $host.put(`ingredients/${id}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getOneIngredient = async (id) => {
  const { data } = await $host.get("ingredients/" + id);
  console.log(data);
  return data;
};

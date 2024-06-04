import axios from "axios";

export const getAllFood = async () => {
  const { data } = await axios.get("/api/foods");
  return data;
};

export const search = async (searchTerm) => {
  const { data } = await axios.get("/api/foods/search/" + searchTerm);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("/api/foods/tags");
  return data;
};

export const getAllByTag = async (tag) => {
  if (tag === "All") return getAllFood();

  const { data } = await axios.get("/api/foods/tags/" + tag);
  return data;
};

export const getById = async (foodId) => {
  const { data } = await axios.get("/api/foods/" + foodId);
  return data;
};

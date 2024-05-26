import { sample_foods } from "../data";

export const getAllFood = async () => sample_foods;

export const search = async (searchTerm) =>
  sample_foods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

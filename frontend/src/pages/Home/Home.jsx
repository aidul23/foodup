import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import { getAllFood, search } from "../../services/foodService";
import Search from "../../components/Search/Search";

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;

  const { searchTerm } = useParams();

  useEffect(() => {
    const loadedFood = searchTerm ? search(searchTerm) : getAllFood();
    loadedFood.then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, [searchTerm]);
  return (
    <>
      <Search/>
      <Thumbnails foods={foods} />
    </>
  );
}
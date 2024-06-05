import React, { useState } from "react";
import classes from "./search.module.css";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const search = async () => {
    term ? navigate(`/search/${term}`) : navigate("/");
  };
  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="search your meal..."
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && search()}
        defaultValue={term}
      />
      <button onClick={search}>Find</button>
    </div>
  );
}

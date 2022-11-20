import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/searchboxsmall.css";
import { useNavigate } from "react-router-dom";

export default function SearchBoxSmall() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <div className="search-container2">
      <form className="form" onSubmit={submitHandler}>
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        />
        {/* <button variant="outline-primary" type="submit" id="button-search"> */}
        <FontAwesomeIcon
          type="submit"
          className="search-icon"
          icon={faSearch}
        />
        {/* </button> */}
      </form>
    </div>
  );
}

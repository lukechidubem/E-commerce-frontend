import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/slider.css";
import React, { useEffect, useReducer, useState } from "react";
import { sliderItems } from "../db";
import axios from "axios";
import logger from "use-reducer-logger";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, slider: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Slider = () => {
  const [{ loading, error, slider }, dispatch] = useReducer(logger(reducer), {
    slider: [],
    loading: true,
    error: "",
  });

  const [slideindex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideindex > 0 ? slideindex - 1 : 2); //2 is last image
    } else {
      setSlideIndex(slideindex < 2 ? slideindex + 1 : 0); // 0 is first image
    }
  };

  //const [slider, setSlider] = useState([]); //default is empty database or json, no sliders

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          "https://lukescommerce.onrender.com/api/slider"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      //setSlider(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="s-container">
      <div className="s-arrow left" onClick={() => handleClick("left")}>
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </div>
      <div
        className="wrapper"
        slideindex={slideindex}
        style={{ transform: `translateX(${slideindex * -100}vw)` }}
      >
        {loading ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          // : error ? (
          //   <h1 className="error">{error}</h1>
          // )
          sliderItems.map((item) => (
            <div className="slide" key={item._id}>
              <div className="img-container">
                <img src={item.image} className="s-img" alt="" />
              </div>
            </div>
          ))
        )}
        <div
          className="slide-text"
          style={{ transform: `translateX(${slideindex * +100}vw)` }}
        >
          <h1>Home for Unique Wears</h1>
          <p>Make your orders and get it delivered to your doorstep at once</p>
          <Link to="/shop">
            Shop Now <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </div>
      </div>
      <div className="s-arrow right" onClick={() => handleClick("right")}>
        <FontAwesomeIcon icon={faArrowCircleRight} />
      </div>
    </div>
  );
};

export default Slider;

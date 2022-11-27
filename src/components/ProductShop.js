import axios from "axios";
import {
  faHeart,
  faShoppingBag,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import "../styles/productshop.css";

const ProductShop = ({ item }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1; //if existItem than quantity + 1 in cart if not than 1
    // this you can put but you don’t have to
    const { data } = await axios.get(
      `https://lukescommerce.onrender.com/api/products/slug/${item.slug}`
    );
    // console.log(existItem.countInStock, quantity);

    if (data.countInStock < quantity) {
      // if (existItem && existItem.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock.");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const addToWishHandler = async () => {
    const existItem = wish.wishItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity : 1;
    // const { data } = await axios.get(`https://lukescommerce.onrender.com/api/products/slug/${product.slug}`);
    if (existItem) {
      window.alert(
        "Sorry. You have already added the product to your wish list."
      );
      return;
    }
    ctxDispatch({
      type: "WISH_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <div className="ps-card" key={item._id}>
      <div className="card-header">
        <Link to={`/product/${item.slug}`}>
          <img src={item.image} alt={item.title} />
        </Link>
      </div>
      <div className="card-body">
        <h3 className="title">{item.title}</h3>
        <span>&#8358; {item.price}</span>
      </div>
      <div className="card-footer">
        <button>
          <FontAwesomeIcon icon={faHeart} onClick={addToWishHandler} />
        </button>
        {item.countInStock === 0 ? (
          <button className="cart cart-out" disabled>
            Out of stock
          </button>
        ) : (
          <button>
            <FontAwesomeIcon icon={faShoppingCart} onClick={addToCartHandler} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductShop;

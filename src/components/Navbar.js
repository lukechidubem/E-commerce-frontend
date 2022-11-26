import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faHeart,
  faShoppingBag,
  faUser,
  faCaretDown,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";
import { Store } from "../Store";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

const MainNavbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="n-container ">
        <div className="n-row">
          <div className="n-col">
            <span className="n-email">Welcome</span>
            {userInfo ? (
              <Link to="/account">
                <FontAwesomeIcon icon={faUser} /> {userInfo.name}
              </Link>
            ) : (
              <span>
                <FontAwesomeIcon icon={faUser} /> Guest
              </span>
            )}
          </div>
          <div className="n-col">
            <div className="socials">
              <a href="/">
                <img src="/images/socials/facebook.png" alt="" />
              </a>
              <a href="/">
                <img src="/images/socials/instagram.png" alt="" />
              </a>
              <a href="/">
                <img src="/images/socials/twitter.png" alt="" />
              </a>
              <a href="/">
                <img src="/images/socials/youtube.png" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div className="n-row middle-nav">
          <div className="n-col">
            {/* <Link to="/" className="logo"> */}
            <Logo />
            {/* </Link> */}
          </div>
          <div className="n-col">
            <SearchBox />
          </div>
          <div className="n-col ">
            <div className="icons sticky-nav">
              {userInfo ? (
                <Link to="#signout" onClick={signoutHandler}>
                  <span>
                    <FontAwesomeIcon icon={faArrowRightToBracket} /> LogOut
                  </span>
                </Link>
              ) : (
                <Link to="/login">
                  <span>
                    <FontAwesomeIcon icon={faArrowRightToBracket} /> Login
                  </span>
                </Link>
              )}
              <a href="/wish">
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                  {wish.wishItems.length > 0 && (
                    <span className="totalItems">{wish.wishItems.length}</span>
                  )}{" "}
                </span>
              </a>
              <a href="/cart">
                <span>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {cart.cartItems.length > 0 && (
                    <span className="totalItems">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </span>
                  )}
                </span>
              </a>
            </div>
            {/* ===================================================      */}
          </div>
        </div>

        <div className="n-row">
          <nav className="third-nav">
            <ul className="items">
              <li className="list">
                <Link to="/" activeclassname="active">
                  Home
                </Link>
              </li>
              <li className="list">
                <Link to="/shop" activeclassname="active">
                  Shop
                </Link>
              </li>

              <li className="list">
                <Link to="/about" activeclassname="active">
                  About
                </Link>
              </li>
              <li className="list">
                <Link to="/contact" activeclassname="active">
                  Contact
                </Link>
              </li>
              {userInfo && (
                <li className="list dropdown">
                  <NavLink activeclassname="active" className="">
                    User <FontAwesomeIcon icon={faCaretDown} />
                    <div className="dropdown-container">
                      <Link to="/profile">User Profile</Link>
                      <Link to="/orderhistory">Order History</Link>
                    </div>
                  </NavLink>
                </li>
              )}

              {userInfo && userInfo.isAdmin && (
                <li className="list dropdown">
                  <NavLink to="" activeclassname="active " className="">
                    Admin <FontAwesomeIcon icon={faCaretDown} />
                    <div className="dropdown-container">
                      <Link to="/admin/dashboard">Dashboard</Link>
                      <Link to="/admin/products">Products</Link>
                      <Link to="/admin/orders">Orders</Link>
                      <Link to="/admin/users">Users</Link>
                    </div>
                  </NavLink>
                </li>
              )}
            </ul>
            {/* <button className="btn">BTN</button> */}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MainNavbar;

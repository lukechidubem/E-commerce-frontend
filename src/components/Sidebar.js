import React, { useContext } from "react";
// import { bubble as Menu } from "react-burger-menu";
import { elastic as Menu } from "react-burger-menu";
import { Link, NavLink } from "react-router-dom";
import { Store } from "../Store";
import {
  faContactBook,
  faCaretDown,
  faHome,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/sidebar.css";
import SearchBoxSmall from "./SearchBoxSmall";

export default function Sidebar(props) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, wish, userInfo } = state;

  return (
    <>
      <Menu>
        <div className="menu-item search-menu">
          <SearchBoxSmall />{" "}
        </div>
        <a className="menu-item" href="/">
          Home <FontAwesomeIcon icon={faHome} />
        </a>
        <a className="menu-item" href="/shop">
          Shop <FontAwesomeIcon icon={faShoppingBag} />
        </a>
        <a className="menu-item" href="/about">
          About <FontAwesomeIcon icon={faUser} />
        </a>
        <a className="menu-item" href="/contact">
          Contact <FontAwesomeIcon icon={faContactBook} />
        </a>

        {userInfo && userInfo.isAdmin && (
          <li className="list dropdown">
            <div activeclassname="active " className="">
              Admin <FontAwesomeIcon icon={faCaretDown} />
              <div className="dropdown-container">
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/users">Users</Link>
              </div>
            </div>
          </li>
        )}
      </Menu>
    </>
  );
}

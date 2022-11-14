import React from "react";
// import { bubble as Menu } from "react-burger-menu";
import { elastic as Menu } from "react-burger-menu";

import {
  faContactBook,
  faHome,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/sidebar.css";
import SearchBoxSmall from "./SearchBoxSmall";

export default function Sidebar(props) {
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
      </Menu>
    </>
  );
}

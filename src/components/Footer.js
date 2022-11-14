import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="f-container">
      <div className="f-row">
        <div className="f-col">
          <Logo />
          <p className="address">
            Address: 33 Emenuke Street Meryland Enugu, Nigeria
          </p>
          <p>Email: stlukejohnson@gmail.com</p>
          <p>Phone No: +2340000004444</p>
        </div>
        <div className="f-col">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
          <h2>Category</h2>
          <ul>
            <li>
              <NavLink to="/shop">Men</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Women</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Kids</NavLink>
            </li>
          </ul>
        </div>
        <div className="f-col">
          <h2>Stay in touch with us</h2>
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
      <div className="f-copyrow">
        <p>&copy; 2022. All Rights Reserved. Powered by Dubem Luke.</p>
      </div>
    </div>
  );
};

export default Footer;

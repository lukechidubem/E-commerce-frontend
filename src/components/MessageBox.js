import React from "react";
import "../styles/messagebox.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MessageBox = (props) => {
  return (
    <>
      <div className="message-container">
        <h2 className="message">{props.children}</h2>
      </div>
    </>
  );
};

export default MessageBox;

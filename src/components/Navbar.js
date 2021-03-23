import React from "react";
import styles from "./Navbar.module.css";
import logo from "../images/logo.svg";

const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
        <p>
          SENTI<span>FEED</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;

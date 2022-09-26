import React from "react";
import "./Header.css";

function Header({ toggleThemeHandler }) {
  return (
    <header>
      <div>
        <img src={process.env.PUBLIC_URL + "/images/TODO 2.png"} alt="logo" className="logo" />
        <h1>todo</h1>
      </div>
      <label className="theme-switch">
        <input
          className="theme-switch-input"
          type="checkbox"
          onChange={toggleThemeHandler}
        />
        <div className="toggle-img"></div>
      </label>
    </header>
  );
}
export default Header;

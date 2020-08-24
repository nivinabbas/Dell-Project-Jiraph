import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const NavBar = () => {
  return (
    <nav className="main-nav">
      <div className="main-nav__nav-items">
        <NavLink
          exact
          className="inactive"
          activeClassName="active"
          to="/status"
        >
          Status
        </NavLink>

        <NavLink className="inactive" activeClassName="active" to="/analysis">
          Analytics
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;

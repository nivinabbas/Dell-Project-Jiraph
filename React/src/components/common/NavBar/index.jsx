import React from "react";
import { NavLink, useRouteMatch, Link } from "react-router-dom";
import "./style.css";

export default () => {
  let { url } = useRouteMatch();

  return (
    <nav className="main-nav">
      <div className="main-nav__nav-items">
        <NavLink
          className="inactive"
          activeClassName="active"
          to={`${url}/status`}
        >
          Status
        </NavLink>

        <NavLink
          className="inactive"
          activeClassName="active"
          to={`${url}/analytics`}
        >
          Analytics
        </NavLink>
      </div>
    </nav>
  );
};

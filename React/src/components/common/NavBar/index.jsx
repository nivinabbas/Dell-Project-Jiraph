import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import "./style.css";

export default () => {
  // let { url } = useRouteMatch();
  // document.querySelector(".hamburger-menu").addEventListener("click", ()=>{
  //   document.querySelector(".container").classList.toggle("change");
// }); // when we click on the sidebar, it should dissappear and appear
  return (
    <div className="sidebar">
            <ul className="menu">
                <li className="menu-item">
                    <a href="#" className="menu-link" data-content="Home">Home</a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link" data-content="Web designer">Web designer</a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link" data-content="Team">Team</a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link" data-content="Pricing">Pricing</a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link" data-content="Contact">Contact</a>
                </li>
            </ul>
    </div>
  );
};

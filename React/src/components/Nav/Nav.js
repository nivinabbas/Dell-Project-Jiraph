import React from 'react';
import './Nav.css';
import {
    BrowserRouter as Router,
    Link,
    useLocation

} from "react-router-dom";

//icons
import logo from "../../img/JiraphLogo.jpg"

export default props => {

    let location = useLocation().pathname;
  
    return (
        <nav className="sidebar">

            <div className="sidebar__header-wrapper">
                <img className="jiraph__logo" src={logo} alt="this is a logo" />
           JIRAPH
          </div>

            <div className="menu__wrapper">

                <div className='menu__item'>
                    <Link className={location === "/register"?'menu__link menu__link--selected':"menu__link"} to="/register">Register</Link>
                </div>
                <div className="menu__item">
                    <Link className={location === "/Admin"?'menu__link menu__link--selected':"menu__link"} to="/Admin">Admin</Link>
                </div>

                <div className="menu__item">
                    <Link className={location === "/status"?'menu__link menu__link--selected':"menu__link"} to="/status">Status</Link>
                </div>

                <div className="menu__item">
                    <Link className="menu__link" to="/analysis">Analysis</Link>
                    <div className="analysis-options">

                        <div className="analysis__item">
                            <Link className={location === "/ModificationByField"?'menu__subLink menu-subLink--selected':"menu__subLink"} to="/ModificationByField">Modification By Field</Link>

                        </div>

                        <div className="analysis__item">
                            <Link className="menu-subLink" to="/DeletedJiraTickets">Deleted Jiras</Link>
                        </div>
                        <div className="analysis__item">
                            <Link className="menu-subLink" to="/ChangesInJiraTickets">Changes In Jira Tickets</Link>
                        </div>
                        <div className="analysis__item">
                            <Link className="menu-subLink" to="/ChangesInParentID">Changes In Parent ID</Link>
                        </div>
                        <div className="analysis__item">
                            <Link className="menu-subLink" to="/DelaysInDelivery">Delays In Delivery</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar__footer">
                FOOTER
          </div>
        </nav>
    )
}
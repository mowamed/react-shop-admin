import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to={"/"} exact className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to={"/users"} className="nav-link">
              Users
            </NavLink>
            <NavLink to={"/roles"} className="nav-link">
              Roles
            </NavLink>
            <NavLink to={"/products"} className="nav-link">
              Products
            </NavLink>
            <NavLink to={"/orders"} className="nav-link">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;

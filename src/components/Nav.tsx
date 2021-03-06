import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../models/User";
import { connect } from "react-redux";

const Nav = (props: { user: User }) => {
  const logout = async () => {
    await axios.post("logout", {});
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <span className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        Shop Admin
      </span>
      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        <Link
          to={"/profile"}
          className="me-3 py-2 text-white text-decoration-none"
        >
          {props.user.name}
        </Link>
        <Link
          to={"/login"}
          onClick={logout}
          className="me-3 py-2 text-white text-decoration-none"
        >
          Sign out
        </Link>
      </nav>
    </header>
  );
};

export default connect((state: { user: User }) => {
  return {
    user: state.user,
  };
})(Nav);

import React, { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { User } from "../models/User";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/userActions";

const Profile = (props: { user: User; setUser: (user: User) => void }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    setFirstName(props.user.first_name);
    setLastName(props.user.last_name);
    setEmail(props.user.email);
  }, [props.user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { data } = await axios.put(`user/info`, {
      first_name,
      last_name,
      email,
    });
    props.setUser(
      new User(data.id, data.first_name, data.last_name, data.email, data.roles)
    );
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.put(`user/password`, {
      password,
      password_confirm,
    });
  };

  return (
    <Wrapper>
      <div className="row g-5 p-4">
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3 mt-3">Update User Info</h4>
          <form className="needs-validation" onSubmit={infoSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  defaultValue={first_name}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  defaultValue={last_name}
                  className="form-control"
                  id="lastName"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  defaultValue={email}
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="col-12 pt-4">
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Submit
              </button>
            </div>
          </form>

          <h4 className="mb-3 mt-3">Update Password</h4>
          <form className="needs-validation" onSubmit={passwordSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="passwordConfirm" className="form-label">
                  Password Confirm
                </label>
                <input
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  required
                />
              </div>

              <div className="col-12 pt-4">
                <button className="w-100 btn btn-primary btn-lg" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default connect(
  (state: { user: User }) => {
    return {
      user: state.user,
    };
  },
  (dispatch: Dispatch<any>) => {
    return {
      setUser: (user: User) => dispatch(setUser(user)),
    };
  }
)(Profile);

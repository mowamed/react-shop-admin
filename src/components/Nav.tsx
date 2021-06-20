import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {User} from "../models/User";


const Nav = () => {

    const [user, setUser] = useState(new User());

    useEffect(() => {
        (async () => {
                const {data} = await axios.get('user');
                setUser(new User(
                    data.id,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.roles
                ));
            }
        )();
    }, []);

    const logout = async () => {
        await axios.post('logout', {});
    }


    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <span className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Shop Admin</span>
            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
                <Link to={"/profile"} className="me-3 py-2 text-white text-decoration-none">{user.name}</Link>
                <Link to={"/login"} onClick={logout} className="me-3 py-2 text-white text-decoration-none">Sign out</Link>
            </nav>
        </header>
    )
}

export default Nav;

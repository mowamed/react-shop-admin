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
                    data.email
                ));
            }
        )();
    }, []);

    const logout = async () => {
        await axios.post('logout', {});
    }


    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Company name</a>
            <ul className="navbar-nav px-3">

                <Link to={"/profile"} className="nav-link" href="/">{user.name}</Link>
                <Link to={"/login"} onClick={logout} className="nav-link" href="/">Sign out</Link>

            </ul>
        </header>
    )
}

export default Nav;

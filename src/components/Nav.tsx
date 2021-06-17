import React, {useState, useEffect} from "react";
import axios from "axios";


const Nav = () => {

    const [user, setUser] = useState({
        first_name: ''
    });

    useEffect(() => {
        (async () => {
            const {data} = await axios.get('http://localhost:8000/api/user', {withCredentials: true});
            setUser(data);
        }
        )();
    }, []);


    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">Company name</a>
            <ul className="navbar-nav px-3">

                    <a className="nav-link" href="/">{user?.first_name}</a>
                    <a className="nav-link" href="/">Sign out</a>

            </ul>
        </header>
    )
}

export default Nav;

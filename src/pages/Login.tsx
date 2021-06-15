import React, {SyntheticEvent, useState} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/login', {
            email,
            password
        }, {withCredentials: true})

        setRedirect(true)

    }

    if (redirect) {
        return <Redirect to={'/'}/>
    }

    return (
        <main className="form-signin" onSubmit={submit}>
            <form>
                <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>

                <div className="form-floating">
                    <input type="email" className="form-control"
                           placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingPassword">Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control"
                           onChange={e => setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign In</button>
            </form>
        </main>
    );
}

export default Login;

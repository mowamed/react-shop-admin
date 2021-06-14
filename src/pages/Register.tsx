import React, {Component, SyntheticEvent} from 'react';
import axios from 'axios'
import '../Login.css'

class Register extends Component {
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await  axios.post('http://localhost:8000/api/register', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm,
        });

        console.log(response);
    }
    render() {
        return (
            <div>
                <main className="form-signin">
                    <form onSubmit={this.submit}>
                            <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control"
                                   placeholder="John" onChange={e => this.first_name = e.target.value} />
                            <label htmlFor="floatingPassword">First Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control"
                                   placeholder="Doe" onChange={e => this.last_name = e.target.value} />
                            <label htmlFor="floatingPassword">Last Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="email" className="form-control"
                                   placeholder="name@example.com" onChange={e => this.email = e.target.value} />
                            <label htmlFor="floatingPassword">Email</label>
                        </div>
                        <div className="form-floating">
                                <input type="password" className="form-control"
                                       onChange={e => this.password = e.target.value} />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control"
                                       placeholder="Password" onChange={e => this.password_confirm = e.target.value} />
                                    <label htmlFor="floatingPassword">Password Confirm</label>
                            </div>

                            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                    </form>
                </main>
            </div>
        );
    }
}

export default Register;

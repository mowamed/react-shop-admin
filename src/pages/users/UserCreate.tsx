import React, {useState, useEffect, SyntheticEvent} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Role} from "../../models/Role";
import {Redirect} from "react-router-dom";

const UserCreate = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState(0);
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect( () => {
        (
            async () => {
                const {data} = await axios.get('roles');
                setRoles(data)
            }
        )()

    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('users', {
            first_name,
            last_name,
            email,
            role_id
        });
        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={'/users'}/>
    }

    return (
        <Wrapper>
            <main>

                <div className="row g-5 p-4">
                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3 mt-3">Create new user</h4>
                        <form className="needs-validation" onSubmit={submit}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input onChange={e => setFirstName(e.target.value)} type="text" className="form-control" required/>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input onChange={e => setLastName(e.target.value)} type="text" className="form-control" id="lastName"
                                           required/>
                                </div>


                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email"
                                           placeholder="you@example.com"/>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="country" className="form-label">Role</label>
                                    <select onChange={e => setRoleId(parseInt(e.target.value))} className="form-select" id="country" required>
                                        <option value="">Choose...</option>
                                        {roles.map((r: Role) => {
                                            return (<option key={r.id} value={r.id}>{r.name}</option>)
                                        })}

                                    </select>
                                </div>

                            </div>

                            <div className="col-12 pt-4">
                                <button className="w-100 btn btn-primary btn-lg" type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </Wrapper>
    );
};

export default UserCreate;

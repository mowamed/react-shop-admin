import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {User} from "../../models/User";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(3);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users?page=${page}`);
                setUsers(data.data);
                setLastPage(data.meta.last_page)

            }
        )()
    }, [page])

    const next = () => {
        if (page <= lastPage) {
            setPage(page + 1)
        }
    }

    const prev = () => {
        if (page >= 1) {
            setPage(page - 1)
        }
    }

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`users/${id}`)
            setUsers(users.filter((user: User) => user.id !== id))
        }
    }
    return (
        <Wrapper>
            <div className="pt-4 pb-4">
                <Link to="/users/create" type="button" className="btn btn-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user: User) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role.name}</td>
                                    <td>
                                        <Link to={`/users/${user.id}/edit`} type="button" className="btn btn-outline-secondary">Edit</Link>
                                        <button onClick={() => del(user.id)} type="button" className="btn btn-outline-secondary">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>

                <nav className="d-flex justify-content-center" aria-label="Pagination">
                    <button className="btn btn-outline-primary" onClick={prev}>Previous</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="btn btn-outline-primary" onClick={next}>Next</button>
                </nav>
            </div>
        </Wrapper>
    );
}

export default Users;

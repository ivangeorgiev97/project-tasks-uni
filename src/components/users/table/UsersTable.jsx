import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const UsersTable = ({ users, currentUser }) => {
    const finalUsers = users.map((user) =>
        currentUser && currentUser.role === "admin" ? (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td><Link className="text-decoration-none" to={`/editUser/${user.id}`}><Button variant="secondary">Edit</Button></Link></td>
                <td><Button variant="danger">Delete</Button></td>
            </tr>
        ) : (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                </tr>
            )
    );

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Role</th>
                    { currentUser && currentUser.role === "admin" ?  <th>Edit</th> : null }
                    { currentUser && currentUser.role === "admin" ?  <th>Delete</th> : null }
                </tr>
            </thead>
            <tbody>
                { finalUsers }
            </tbody>
        </Table>
    );
}


UsersTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired
        }).isRequired
    ),
    currentUser: PropTypes.shape({
            id: PropTypes.number,
            role: PropTypes.string
        })
}

export default UsersTable

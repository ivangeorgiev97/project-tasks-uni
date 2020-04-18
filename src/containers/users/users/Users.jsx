import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import UsersTable from "../../../components/users/table/UsersTable"

const Users = () => {
  // TODO - Check why this holds users as separate objects and then also in separate array with users, is it because of persistance configuration or something else
  const users = useSelector(state => state.users.users)
  const currentUser = useSelector(state => state.users.currentUser)

  return (
    <section className="Users">
        <Button variant="primary" className="mb-3">Add user</Button>
        <UsersTable 
          users={users}
          currentUser={currentUser}
        />
    </section>
  );
}

export default Users

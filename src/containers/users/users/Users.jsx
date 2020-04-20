import React from "react";
import { useSelector, connect } from "react-redux";
import Button from "react-bootstrap/Button";
import UsersTable from "../../../components/users/table/UsersTable";
import { Link } from "react-router-dom";
import { deleteUser } from "../../../store/users/actions";
import { deleteTasks } from "../../../store/tasks/actions";

const Users = ({ dispatch }) => {
  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.users.currentUser);

  const onDeleteUser = id => {
   const user = users.find(user => user.id === parseInt(id))
   if (!user) return;

    if (
      id &&
      !isNaN(parseInt(id)) &&
      currentUser.role === "admin" &&
      window.confirm(
        "Are you sure you want to remove this user? This will also remove all tasks created by the user."
      )
    )
      dispatch(deleteUser(parseInt(id)));
      dispatch(deleteTasks(parseInt(id)))
  };

  return (
    <section className="Users">
      <Link className="text-decoration-none" to="/addUser">
        <Button variant="primary" className="mb-3">
          Add user
        </Button>
      </Link>
      <UsersTable
        users={users}
        currentUser={currentUser}
        onDeleteUser={onDeleteUser}
      />
    </section>
  );
};

export default connect()(Users);

import React from "react";
import { useSelector, connect } from "react-redux";
import Button from "react-bootstrap/Button";
import UsersTable from "../../../components/users/table/UsersTable"
import { Link } from "react-router-dom";
import { deleteUser } from "../../../store/users/actions";

const Users = ({dispatch}) => {
  // TODO - Check why this holds users as separate objects and then also in separate array with users, is it because of persistance configuration or something else
  const users = useSelector(state => state.users.users)
  const currentUser = useSelector(state => state.users.currentUser)

  const onDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user')) dispatch(deleteUser(parseInt(id)));
  }

  return (
    <section className="Users">
        <Link className="text-decoration-none" to="/addUser">
          <Button variant="primary" className="mb-3">Add user</Button>
        </Link>
        <UsersTable 
          users={users}
          currentUser={currentUser}
          onDeleteUser={onDeleteUser}
        />
    </section>
  );
}


/* 
TODO- they can also be added in connect()
const mapStateToProps = state => {
  return {
      // TODO - Check why this holds users as separate objects and then also in separate array with users, is it because of persistance configuration or something else
      users: state.users.users,
      currentActiveUser: state.users.currentActiveUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addUser: user => dispatch(addUser(user)) 
  }
} */

export default connect()(Users)

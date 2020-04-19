import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const TasksTable = ({ tasks, currentUser, onDeleteTask }) => {
  const finalTasks = tasks.map((task) =>
    currentUser && (currentUser.id === task.userId || currentUser.role === "admin") ? (
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.estimation}</td>
        <td>{task.isCompleted ? <span>Completed</span> : <span>Not completed</span> }</td>
        {/* <td>{task.userId}</td> */}
        <td>
          <Link className="text-decoration-none" to={`/editTask/${task.id}`}>
            <Button variant="secondary">Edit</Button>
          </Link>
        </td>
        <td>
          <Button variant="danger" onClick={() => onDeleteTask(task.id)}>Delete</Button>
        </td>
      </tr>
    ) : (
      <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.title}</td>
        <td>{task.description}</td>
        <td>{task.estimation}</td>
        <td>{task.isCompleted ? <span>Completed</span> : <span>Not completed</span> }</td>
        {/* <td>{task.userId}</td> */}
        <td>Not editable</td>
        <td>Not removeable</td>
      </tr>
    )
  );

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Estimation</th>
          <th>Status</th>
          {/* <th>User Id</th> */}
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{finalTasks}</tbody>
    </Table>
  );
};

TasksTable.propTypes = {
  Tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      estimation: PropTypes.number.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired
    }).isRequired
  ),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    role: PropTypes.string
  }),
  onDeleteTask: PropTypes.func
};

export default TasksTable;

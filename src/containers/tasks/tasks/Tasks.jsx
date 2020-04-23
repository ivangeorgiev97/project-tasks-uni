import React from "react";
import { useSelector, connect } from "react-redux";
import Button from "react-bootstrap/Button";
import TasksTable from "../../../components/tasks/table/TasksTable";
import { Link } from "react-router-dom";
import { deleteTask } from "../../../store/tasks/actions";

const Tasks = ({ dispatch }) => {
  const tasks = useSelector((state) => state.tasks);
  const currentUser = useSelector((state) => state.currentUser);

  const onDeleteTask = id => {
   const task = tasks.find(task => task.id === parseInt(id))
   if (!task) return;

    if (
      id &&
      !isNaN(parseInt(id)) &&
      (currentUser.id === task.userId || currentUser.role === "admin") &&
      window.confirm(
        "Are you sure you want to remove this task?"
      )
    )
      dispatch(deleteTask(parseInt(id)));
  };

  return (
    <section className="Tasks">
      <Link className="text-decoration-none" to="/addTask">
        <Button variant="primary" className="mb-3">
          Add task
        </Button>
      </Link>
      <TasksTable
        tasks={tasks}
        currentUser={currentUser}
        onDeleteTask={onDeleteTask}
      />
    </section>
  );
};

export default connect()(Tasks);

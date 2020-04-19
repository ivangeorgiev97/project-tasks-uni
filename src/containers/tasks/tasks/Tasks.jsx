import React from "react";
import { useSelector, connect } from "react-redux";
import Button from "react-bootstrap/Button";
import TasksTable from "../../../components/tasks/table/TasksTable";
import { Link } from "react-router-dom";
import { deleteTask } from "../../../store/tasks/actions";

const Tasks = ({ dispatch }) => {
  // TODO - Check why this holds tasks as separate objects and then also in separate array with tasks, is it because of persistance configuration or something else
  const tasks = useSelector((state) => state.tasks.tasks);
  const currentUser = useSelector((state) => state.users.currentUser);

  const onDeleteTask = id => {
    // TODO - Check if task userid is same
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

/* 
TODO- they can also be added in connect()
const mapStateToProps = state => {
  return {
      // TODO - Check why this holds tasks as separate objects and then also in separate array with tasks, is it because of persistance configuration or something else
      tasks: state.tasks.tasks,
      currentActivetask: state.tasks.currentActivetask
  }
}

const mapDispatchToProps = dispatch => {
  return {
      addtask: task => dispatch(addtask(task)) 
  }
} */

export default connect()(Tasks);

import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { updateTask } from "../../../store/tasks/actions";
import { validateTitle, validateDescription, validateEstimation } from '../../../validation/taskValidation'

const EditTask = ({ dispatch }) => {
  const history = useHistory();
  const { taskId } = useParams();
  const currentActiveUser = useSelector((state) => state.users.currentUser);
  // TODO - Check why this holds tasks as separate objects and then also in separate array with tasks, is it because of persistance configuration or something else
  const tasks = useSelector((state) => state.tasks.tasks);
  const task = tasks.find(task => task.id === parseInt(taskId))
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimation, setEstimation] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [userId, setUserId] = useState(1);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [estimationValid, setEstimationValid] = useState(true);

  useEffect(() => {
    // Check if user is logged in and redirect to main page if the user is logged
        // Check if user is logged in and redirect to main page if the user is logged
        if (
            !currentActiveUser ||
            !taskId ||
            isNaN(parseInt(taskId)) ||
            taskId <= 0 ||
            Object.keys(currentActiveUser).length === 0 ||
            !task ||
            Object.keys(task).length === 0 ||
            (currentActiveUser.id !== task.userId &&
            currentActiveUser.role !== "admin")
          ) {
            // Redirect user to main page
            history.push("/");
          }

          setTitle(task.title)
          setDescription(task.description)
          setEstimation(task.estimation)
          setIsCompleted(task.isCompleted)
          setUserId(task.userId)
  }, [currentActiveUser, taskId, task, history]);

  const handleUpdateTaskSubmit = evt => {
    evt.preventDefault();

    // If forms are not valid or user is not unique display messages for fields and do not dispatch action
    if (!validateAddTaskForm()) return;

    // If form is validated dispatch addUser action
    dispatch(updateTask({id: parseInt(taskId), title: title, description: description, estimation: estimation, isCompleted: isCompleted, userId: userId }));

    // Redirect to tasks
    history.push('/tasks')
  };

  // TODO - Research how to call the validation once on submit
  const validateAddTaskForm = () => {
    return (validateTitle(title) && validateDescription(description) && validateEstimation(estimation))
  }

  return (
    <section>
      <h3>Add task</h3>
      <form onSubmit={handleUpdateTaskSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="title"
            name="title"
            placeholder="Enter title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => setTitleValid(validateTitle(e.target.value))}
          />
          {!titleValid ? <span className="text-danger">Please enter minimum 4 symbols for title.</span> : null}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={(e) => { setDescriptionValid(validateDescription(e.target.value)); }}
          />
          {!descriptionValid ? <span className="text-danger">Please enter minimum 5 symbols for description.</span> : null}
        </div>
        <div className="form-group">
          <label htmlFor="estimation">Estimation</label>
          <input
            type="number"
            className="form-control"
            id="estimation"
            name="estimation"
            placeholder="Enter estimation"
            required
            value={estimation}
            onChange={(e) => setEstimation(e.target.value)}
            onBlur={(e) => setEstimationValid(validateEstimation(e.target.value))}
          />
          {!estimationValid ? <span className="text-danger">Estimation should be positive number</span> : null}
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isCompleted"
            name="isCompleted"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
          <label className="form-check-label" htmlFor="isCompleted">
            Is task completed
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => { setTitleValid(validateTitle(title)); setDescriptionValid(validateDescription(description)); setEstimationValid(validateEstimation(estimation)) }}
        >
          Update task
        </button>
      </form>
    </section>
  );
};

export default connect()(EditTask);

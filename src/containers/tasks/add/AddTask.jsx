import React, { useState, useEffect } from "react";
import { connect, useStore } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addTask } from "../../../store/tasks/actions";
import { validateTitle, validateDescription, validateEstimation } from '../../../validation/taskValidation'

const AddTask = ({ dispatch }) => {
  const store = useStore();
  const history = useHistory();
  const currentActiveUser = store.getState().users.currentUser;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimation, setEstimation] = useState(1);
  // const [isCompleted, setIsCompleted] = useState(false);
  const [titleValid, setTitleValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [estimationValid, setEstimationValid] = useState(true);

  useEffect(() => {
    // Check if user is logged in and redirect to main page if the user is logged
    if (!currentActiveUser || Object.keys(currentActiveUser).length === 0) {
      // Redirect user to main page
      history.push('/login')
    }
  });

  const handleAddUserSubmit = evt => {
    evt.preventDefault();

    // If forms are not valid or user is not unique display messages for fields and do not dispatch action
    if (!validateAddTaskForm()) return;

    // If form is validated dispatch addUser action
    dispatch(addTask({ title: title, description: description, estimation: estimation, isCompleted: false, userId: currentActiveUser.id }));

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
      <form onSubmit={handleAddUserSubmit}>
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
            onChange={(e) => setEstimation(e.target.value)}
            onBlur={(e) => setEstimationValid(validateEstimation(e.target.value))}
          />
          {!estimationValid ? <span className="text-danger">Estimation should be positive number</span> : null}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => { setTitleValid(validateTitle(title)); setDescriptionValid(validateDescription(description)); setEstimationValid(validateEstimation(estimation)) }}
        >
          Add task
        </button>
      </form>
    </section>
  );
};

export default connect()(AddTask);

import React, { useState, useEffect } from "react";
import { connect, useStore } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addUser } from "../../../store/users/actions";
import { validateUsername, validatePassword } from "../../../validation/userValidation";

const AddUser = ({ dispatch }) => {
  const store = useStore();
  const history = useHistory();
  const currentActiveUser = store.getState().users.currentUser;
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userValid, setUserValid] = useState(true);
  const [userAlreadyTaken, setUserAlreadyTaken] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [samePasswords, setSamePasswords] = useState(true);

  useEffect(() => {
    // Check if user is logged in and redirect to main page if the user is logged
    if (!currentActiveUser || Object.keys(currentActiveUser).length === 0 || currentActiveUser.role !== 'admin') {
      // Redirect user to main page
      history.push('/login')
    }
  });

  const handleAddUserSubmit = evt => {
    evt.preventDefault();

    // If forms are not valid or user is not unique display messages for fields and do not dispatch action
    if (!validateAddUserForm()) return;

    // If form is validated dispatch addUser action
    dispatch(addUser({ username: username, password: password1 }));

    // Redirect to users
    history.push('/users')
  };

  // TODO - Research how to call the validation once on submit
  const validateAddUserForm = () => {
    return (validateUsername(username) && validatePassword(password1) && password1 === password2 && isUserUnique())
  }

  const isUserUnique = () => {
    // TODO - Check why this holds users as separate objects and then also in separate array with users, is it because of persistance configuration or something else
    const allUsers = store.getState().users.users;
    const user = allUsers.find(user => user.username === username)

    if (user && Object.keys(user).length !== 0) {
      setUserAlreadyTaken(true)
      return false
    } else {
      setUserAlreadyTaken(false)
    }

    return true;
  }

  return (
    <section>
      <h3>Add user</h3>
      <form onSubmit={handleAddUserSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="username"
            name="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => { setUserValid(validateUsername(e.target.value) && isUserUnique()) }}
          />
          {!userValid && !userAlreadyTaken ? <span className="text-danger">Please enter minimum 3 symbols for user.</span> : null}
          {userAlreadyTaken ? <span className="text-danger">Username must be unique.</span> : null}
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            name="password1"
            placeholder="Enter password"
            onChange={(e) => setPassword1(e.target.value)}
            onBlur={(e) => { setPasswordValid(validatePassword(e.target.value)); }}
          />
          {!passwordValid ? <span className="text-danger">Please enter minimum 4 symbols for passwords.</span> : null}
        </div>
        <div className="form-group">
          <label htmlFor="password2">Repeat Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            placeholder="Repeat password"
            onChange={(e) => setPassword2(e.target.value)}
            onBlur={(e) => { setSamePasswords(password1 === password2) }}
          />
          {!samePasswords ? <span className="text-danger">Password fields should be same.</span> : null}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => { setUserValid(validateUsername(username)); setPasswordValid(validatePassword(password1)); setSamePasswords(password1 === password2); setUserAlreadyTaken(isUserUnique()) }}
        >
          Add user
        </button>
      </form>
    </section>
  );
};

export default connect()(AddUser);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useStore } from "react-redux";
import { useHistory } from 'react-router-dom';
import { validateUsername, validatePassword } from "../../../validation/userValidation";
import { setCurrentUser } from "../../../store/users/actions";

const Login = ({ dispatch }) => {
  const store = useStore();
  const currentActiveUser = store.getState().users.currentUser;
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userValid, setUserValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [userFound, setUserFound] = useState(true);
  // const [activeUser, setActiveUser] = useState({}); 

  let activeUser = {};

  useEffect(() => {
    // Check if user is logged in and redicrect to main page if the user is logged
    if (currentActiveUser && Object.keys(currentActiveUser).length !== 0) {
      // Redirect user to main page
      history.push('/')
    }
  });

  const handleLoginSubmit = evt => {
    evt.preventDefault();
    // If forms are not valid or user is not unique display messages for fields and do not dispatch action
    if (!validateLoginForm()) return;

    dispatch(setCurrentUser(activeUser));
    window.location.reload()
  };

  // TODO - Research how to call the validation once on submit
  const validateLoginForm = () => {
    return (validateUsername(username) && validatePassword(password) && checkUsernameAndPassword())
  };

  const checkUsernameAndPassword = () => {
    // TODO - Check why this holds users as separate objects and then also in separate array with users, is it because of persistance configuration or something else
    const allUsers = store.getState().users.users;
    const user = allUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (!user || Object.keys(user).length === 0) {
      activeUser = {}
      return false;
    } else {
      activeUser = user
    }

    return true;
  }

  return (
    <section>
      <h3>Login</h3>
      <form onSubmit={handleLoginSubmit}>
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
            onBlur={(e) => setUserValid(validateUsername(e.target.value))}
          />
          {!userValid ? <span className="text-danger">Please enter minimum 3 symbols for user.</span> : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPasswordValid(validatePassword(e.target.value))}
          />
          {!passwordValid ? <span className="text-danger">Please enter minimum 4 symbols for passwords.</span> : null}
        </div>
        <div>
          {!userFound ? <span className="text-danger">User was not found</span> : null}
        </div>
        <button 
        type="submit" 
        className="btn btn-primary"
        onClick={() => {setUserValid(validateUsername(username)); setPasswordValid(validatePassword(password)); setUserFound(checkUsernameAndPassword())}}
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default connect()(Login);

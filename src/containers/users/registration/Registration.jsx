import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addUser } from "../../../store/users/actions";
import { validateUsername, validatePassword } from "../../../validation/userValidation";

const Registration = ({ dispatch }) => {
  const allUsers = useSelector((state) => state.users);
  const currentActiveUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userValid, setUserValid] = useState(true);
  const [userAlreadyTaken, setUserAlreadyTaken] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [samePasswords, setSamePasswords] = useState(true);

  useEffect(() => {
    // Check if user is logged in and redirect to main page if the user is logged
    if (currentActiveUser && Object.keys(currentActiveUser).length !== 0) {
      // Redirect user to main page
      history.push('/')
    }
  });

  const handleRegistrationSubmit = (evt) => {
    evt.preventDefault();

    // If forms are not valid or user is not unique display messages for fields and do not dispatch action
    if (!validateRegistrationForm()) return;

    // If form is validated dispatch addUser action
    dispatch(addUser({ username: username, password: password1 }));

    // Redirect user to login
    history.push('/login')
  };

  const validateRegistrationForm = () => {
    return (validateUsername(username) && validatePassword(password1) && password1 === password2 && isUserUnique())
  }

  const isUserUnique = () => {
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
      <h3>Registration</h3>
      <form onSubmit={handleRegistrationSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="username"
            name="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => { setUserValid(validateUsername(e.target.value)); isUserUnique() }}
          />
          {!userValid ? <span className="text-danger">Please enter minimum 3 symbols for user.</span> : null}
          {userAlreadyTaken ? <span className="text-danger">User must be unique</span> : null}
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            name="password1"
            placeholder="Enter password"
            required
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
            required
            onChange={(e) => setPassword2(e.target.value)}
            onBlur={(e) => { setSamePasswords(password1 === password2) }}
          />
          {!samePasswords ? <span className="text-danger">Password fields should be same.</span> : null}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => { setUserValid(validateUsername(username)); setPasswordValid(validatePassword(password1)); setSamePasswords(password1 === password2); isUserUnique() }}
        >
          Register
        </button>
      </form>
    </section>
  );
};

export default connect()(Registration);

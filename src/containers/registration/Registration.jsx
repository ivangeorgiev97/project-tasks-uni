import React, { useState } from "react";
import { connect, useStore } from "react-redux";
import { useHistory } from 'react-router-dom';
import { addUser } from "../../store/users/actions";
import { validateUsername, validatePassword } from "../../validation/userValidation";

const Registration = ({ dispatch }) => {
  const store = useStore();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [userValid, setUserValid] = useState(true);
  const [userAlreadyTaken, setUserAlreadyTaken] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [samePasswords, setSamePasswords] = useState(true);

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
    if (!validateUsername(username)) {
      setUserValid(false)
    } else {
      setUserValid(true)
    }

    if (!validatePassword(password1)) {
      setPasswordValid(false)
    } else {
      setPasswordValid(true)
    }

    if (password1 !== password2) {
      setSamePasswords(false)
    } else {
      setSamePasswords(true)
    }

    const uniqueUser = isUserUnique()

    return (userValid && passwordValid && samePasswords && uniqueUser)
  }

  const isUserUnique = () => {
    const allUsers = store.getState().users;

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
            onChange={(e) => setUsername(e.target.value)}
          />
          { !userValid ? <span className="text-danger">Please enter minimum 3 symbols for user.</span> : null }
          { userAlreadyTaken ? <span className="text-danger">User must be unique</span> : null }
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
          />
          { !passwordValid ? <span className="text-danger">Please enter minimum 4 symbols for passwords.</span> : null }
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
          />
          { !samePasswords ? <span className="text-danger">Password fields should be same.</span> : null }
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </section>
  );
};

export default connect()(Registration);

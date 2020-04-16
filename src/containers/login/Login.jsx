import React, { useState } from "react";
import { connect } from "react-redux";
import { useStore } from "react-redux";
import { validateUsername, validatePassword } from "../../validation/userValidation";
// import { setCurrentUser } from "../../store/users/actions"

const Login = ({ dispatch }) => {
  const store = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userValid, setUserValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [userFound, setUserFound] = useState(false);

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    // If forms are not valid or user is not unique display messages for fields and do not dispatch action
    if (!validateLoginForm()) return;

    // TODO - update login functionality
  };

  const validateLoginForm = () => {
    if (!validateUsername(username)) {
      setUserValid(false)
    } else {
      setUserValid(true)
    }

    if (!validatePassword(password)) {
      setPasswordValid(false)
    } else {
      setPasswordValid(true)
    }

    setUserFound(checkUsernameAndPassword());

    return (userValid && passwordValid && userFound)
  };

  const checkUsernameAndPassword = () => {
    const allUsers = store.getState().users;
    const user = allUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (Object.keys(user).length === 0) {
      setUserFound(false);
      return true;
    } else {
      setUserFound(true);
    }

    return false;
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
          />
          { !userValid ? <span className="text-danger">Please enter minimum 3 symbols for user.</span> : null }
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
          />
          { !passwordValid ? <span className="text-danger">Please enter minimum 4 symbols for passwords.</span> : null }
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </section>
  );
};

export default connect()(Login);

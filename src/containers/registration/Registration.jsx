import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/users/actions"

const Registration = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleRegistrationSubmit = (evt) => {
    evt.preventDefault();
    if (password1 !== password2) {
      console.log('passwords should be the same')
    }
    dispatch(addUser({username: username, password: password1}))
  };

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
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            name="password1"
            placeholder="Enter password"
            onChange={e => setPassword1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Repeat Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            placeholder="Repeat password"
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </section>
  );
};

export default connect()(Registration);

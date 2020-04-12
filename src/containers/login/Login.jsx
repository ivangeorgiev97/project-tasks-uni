import React, { useState } from "react";
import { connect } from "react-redux";
import { useStore } from "react-redux";
// import { setCurrentUser } from "../../store/users/actions"

const Login = ({ dispatch }) => {
  const store = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userFound, setUserFound] = useState(false);

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    // TODO - remove userFound from this conditonal here and update login funcitonality
    if (!userFound && !checkUsernameAndPassword) return;
  };

  const checkUsernameAndPassword = () => {
    const allUsers = store.getState().users;

    const user = allUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (Object.keys(user).length !== 0) {
      setUserFound(true);
      return true;
    } else {
      setUserFound(false);
    }

    return false;
  };

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
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </section>
  );
};

export default connect()(Login);

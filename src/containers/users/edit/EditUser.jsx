import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateUser } from "../../../store/users/actions";
import {
  validateUsername,
  validatePassword,
} from "../../../validation/userValidation";

const EditUser = ({ dispatch }) => {
  const history = useHistory();
  const { userId } = useParams();
  const currentActiveUser = useSelector((state) => state.currentUser);
  const allUsers = useSelector((state) => state.users);
  const user = allUsers.find((user) => user.id === parseInt(userId));
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  // const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const roleOptions = [
    { value: "user", name: "User" },
    { value: "admin", name: "Admin" },
  ];
  const [changePassword, setChangePassword] = useState(true);
  const [userValid, setUserValid] = useState(true);
  const [userAlreadyTaken, setUserAlreadyTaken] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  // const [samePasswords, setSamePasswords] = useState(true);

  useEffect(() => {
    // Check if user is logged in and redirect to main page if the user is not logged
    if (
      !currentActiveUser ||
      !userId ||
      isNaN(parseInt(userId)) ||
      userId <= 0 ||
      !user ||
      Object.keys(user).length === 0 ||
      Object.keys(currentActiveUser).length === 0 ||
      currentActiveUser.role !== "admin"
    ) {
      // Redirect user to main page
      history.push("/");
    }

    setUsername(user.username);
    setRole(user.role);
  }, [currentActiveUser, userId, user, history]);

  const handleEditUserSubmit = (evt) => {
    evt.preventDefault();

    // If forms are not valid or user is not unique display messages for fields and do not dispatch action
    if (!validateupdateUserForm()) return;

    // If form is validated dispatch updateUser action
    dispatch(
      updateUser({
        id: parseInt(userId),
        username: username,
        password: password1 && password1.length >= 3 ? password1 : "",
        role: role,
      })
    );

    // Redirect to users
    history.push("/users");
  };

  const validateupdateUserForm = () => {
    return validateUsername(username) && isUserUnique();
  };

  const isUserUnique = () => {
    const checkUser = allUsers.find((user) => user.username === username);

    if (
      checkUser &&
      Object.keys(checkUser).length !== 0 &&
      checkUser.id &&
      checkUser.id !== parseInt(userId)
    ) {
      setUserAlreadyTaken(true);
      return false;
    } else {
      setUserAlreadyTaken(false);
    }

    return true;
  };

  const finalRoleOptions = roleOptions.map((roleOption) =>
    roleOption.value !== role ? (
      <option key={roleOption.value} value={roleOption.value}>
        {roleOption.name}
      </option>
    ) : (
      <option key={roleOption.value} value={roleOption.value} selected>
        {roleOption.name}
      </option>
    )
  );

  return (
    <section>
      <h3>Edit user</h3>
      <form onSubmit={handleEditUserSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="username"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={(e) => {
              setUserValid(validateUsername(e.target.value)); isUserUnique()
            }}
          />
          {!userValid && !userAlreadyTaken ? (
            <span className="text-danger">
              Please enter minimum 3 symbols for user.
            </span>
          ) : null}
          {userAlreadyTaken ? (
            <span className="text-danger">Username must be unique.</span>
          ) : null}
        </div>
        <div className="form-check mt-1">
          <input
            type="checkbox"
            className="form-check-input"
            id="changePassword"
            name="changePassword"
            checked={changePassword}
            onChange={() => setChangePassword(!changePassword)}
          />
          <label className="form-check-label" htmlFor="changePassword">
            Show change password field
          </label>
        </div>
        {changePassword ? (
          <div>
            <div className="form-group">
              <label htmlFor="password1">New password</label>
              <input
                type="password"
                className="form-control"
                id="password1"
                name="password1"
                placeholder="Enter password"
                onChange={(e) => setPassword1(e.target.value)}
                onBlur={(e) => {
                  setPasswordValid(validatePassword(e.target.value));
                }}
              />
              {!passwordValid ? (
                <span className="text-danger">
                  Please enter minimum 4 symbols for passwords.
                </span>
              ) : null}
            </div>
            {/*             <div className="form-group">
              <label htmlFor="password2">Repeat Password</label>
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                placeholder="Repeat password"
                onChange={(e) => setPassword2(e.target.value)}
                onBlur={(e) => {
                  setSamePasswords(password1 === password2);
                }}
              />
              {!samePasswords ? (
                <span className="text-danger">
                  Password fields should be same.
                </span>
              ) : null}
            </div> */}
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            {finalRoleOptions}
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            setUserValid(validateUsername(username));
            setUserAlreadyTaken(isUserUnique());
          }}
        >
          Update user
        </button>
      </form>
    </section>
  );
};

export default connect()(EditUser);

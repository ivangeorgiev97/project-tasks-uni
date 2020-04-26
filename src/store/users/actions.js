import {
  RECEIVE_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_CURRENT_USER,
} from "./actionTypes";
import { usersService } from "../../services/usersService";

/*
 * User actions
 */
const receiveUsers = (data) => ({
  type: RECEIVE_USERS,
  payload: data
});
export const getUsers = () => {
  return (dispatch) => {
    return usersService
      .getAllUsers()
      .then((response) => {
        dispatch(receiveUsers(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    // NOTE - This should be done from the backend, I use this only for testing
    user.role = "user";
    return usersService.addUser(user).then((response) => {
      dispatch({ type: ADD_USER, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    return usersService.updateUser(user.id, user).then((response) => {
      dispatch({ type: UPDATE_USER, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    return usersService.deleteUser(id).then(() =>
      // response
      dispatch({ type: DELETE_USER, payload: id })
    )
    .catch((error) => {
      console.log(error);
    });
  };
};

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

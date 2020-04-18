import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_CURRENT_USER,
} from "./actionTypes";

/*
 * User actions
 */
export const addUser = user => ({
  type: ADD_USER,
  payload: user
});

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user
});

export const deleteUser = id => ({
  type: DELETE_USER,
  payload: id
});

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

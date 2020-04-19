import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_TASKS,
} from "./actionTypes";

/*
 * Task actions
 */
export const addTask = task => ({
  type: ADD_TASK,
  payload: task
});

export const updateTask = task => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
});

export const deleteTasks = userId => ({
  type: DELETE_TASKS,
  payload: userId,
});

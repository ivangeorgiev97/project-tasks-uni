import {
  RECEIVE_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_TASKS,
} from "./actionTypes";
import { tasksService } from "../../services/tasksService"


/*
 * Task actions
 */
const receiveTasks = (data) => ({
  type: RECEIVE_TASKS,
  payload: data
})
export const getTasks = () => {
  return (dispatch) => {
    return tasksService
      .getAllTasks()
      .then((response) => {
        dispatch(receiveTasks(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export const addTask = task => {
  return (dispatch) => {
    // NOTE - This should be done from the backend, I use this way only for testing
    task.isCompleted = false;
    return tasksService.addTask(task).then((response) => {
      dispatch({ type: ADD_TASK, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const updateTask = task => {
  return (dispatch) => {
    return tasksService.updateTask(task.id, task).then((response) => {
      dispatch({ type: UPDATE_TASK, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const deleteTask = id => {
  return (dispatch) => {
    return tasksService.deleteTask(id).then(() => {
      // response
      dispatch({ type: DELETE_TASK, payload: id })
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

export const deleteTasks = userId => {
  return dispatch => {
    return tasksService.getAllTasksByUserId(userId).then((response) => {
      response.data.forEach(task => {
        dispatch(deleteTask(task.id))
      })
      dispatch({ type: DELETE_TASKS, payload: userId })
    })
    .catch((error) => {
      console.log(error);
    });
  }
};

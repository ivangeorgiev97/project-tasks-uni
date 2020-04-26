import initialState from "../initialState";
import {
  RECEIVE_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_TASKS,
} from "./actionTypes";

const tasks = (state = initialState.tasks, action) => {
  switch (action.type) {
    case RECEIVE_TASKS:
      return action.payload
    case ADD_TASK:
      return [
        ...state,
          {
            id: (state && state.length > 0) ? state[state.length-1].id + 1 : 1,
            title: action.payload.title, 
            description: action.payload.description,
            estimation: action.payload.estimation,
            isCompleted: action.payload.isCompleted,
            userId: action.payload.userId
          }
      ];
    case UPDATE_TASK:
      return [
        ...state.map((task) =>
          task.id === action.payload.id
            ? {
                id: action.payload.id,
                title: action.payload.title, 
                description: action.payload.description,
                estimation: action.payload.estimation,
                isCompleted: action.payload.isCompleted,
                userId: action.payload.userId
              }
            : task
        )
            ];
    case DELETE_TASK:
      return [
        ...state.filter((task) => task.id !== action.payload)
      ];
    case DELETE_TASKS:
      return [
        ...state.filter((task) => task.userId !== action.payload)
      ];
    default:
      return state;
  }
};

export default tasks;

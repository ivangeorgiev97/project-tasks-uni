import initialState from "../initialState";
import {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  DELETE_TASKS,
} from "./actionTypes";

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: (state.tasks && state.tasks.length > 0) ? state.tasks[state.tasks.length-1].id + 1 : 1,
            title: action.payload.title, 
            description: action.payload.description,
            estimation: action.payload.estimation,
            isCompleted: action.payload.isCompleted,
            userId: action.payload.userId
          }
        ]
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
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
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload)
      };
    case DELETE_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.userId !== action.payload)
      };
    default:
      return state;
  }
};

export default tasks;

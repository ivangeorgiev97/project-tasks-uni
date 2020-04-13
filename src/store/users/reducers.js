import initialState from "../initialState";
import { ADD_USER, UPDATE_USER, DELETE_USER, SET_CURRENT_USER } from "./actionTypes";

const users = (state = initialState.users, action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          id: state.length + 1,
          username: action.payload.username,
          password: action.payload.password,
          role: "user",
        }
      ];
    case UPDATE_USER:
      return state.users.map(user =>
        user.id === action.payload.id
          ? {
              id: action.payload.id,
              username: action.payload.username,
              password: action.payload.password,
              role: action.payload.role,
            }
          : user
      );
    case DELETE_USER:
      // TODO - Add Delete cascade for tasks
      return state.users.filter(user => user.id !== action.payload);
    // TODO - Update setCurrentUser functionality 
    case SET_CURRENT_USER:
      state.currentUser = action.payload;
      return state;
    default:
      return state;
  }
};

export default users;

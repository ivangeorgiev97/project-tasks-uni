import initialState from "../initialState";
import { ADD_USER, UPDATE_USER, DELETE_USER, SET_CURRENT_USER } from "./actionTypes";

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state.users,
        {
          id: action.payload.id,
          username: action.payload.username,
          password: action.payload.password,
          role: action.payload.role,
        },
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
      // TODO -ADD Delete cascade for tasks
      return state.users.filter(user => user.id !== action.payload);
    case SET_CURRENT_USER:
      state.currentUser = action.payload;
      return state.currentUser;
    default:
      return state;
  }
};

export default users;

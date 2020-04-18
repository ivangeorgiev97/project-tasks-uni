import initialState from "../initialState";
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_CURRENT_USER,
} from "./actionTypes";

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: state.users.length + 1,
            username: action.payload.username,
            password: action.payload.password,
            role: "user",
          }
        ]
      };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? {
                id: action.payload.id,
                username: action.payload.username,
                password: action.payload.password && action.payload.password.length >= 3 ? action.payload.password : user.password,
                role: action.payload.role,
              }
            : user
        ),
      };
    case DELETE_USER:
      // TODO - Add Delete cascade for tasks
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default users;

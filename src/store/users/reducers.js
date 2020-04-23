import initialState from "../initialState";
import {
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_CURRENT_USER,
} from "./actionTypes";

export const usersReducers = (state = initialState.users, action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          id: state && state.length > 0 ? state[state.length - 1].id + 1 : 1,
          username: action.payload.username,
          password: action.payload.password,
          role: "user",
        },
      ];
    case UPDATE_USER:
      return [
        ...state.map((user) =>
          user.id === action.payload.id
            ? {
                id: action.payload.id,
                username: action.payload.username,
                password:
                  action.payload.password && action.payload.password.length >= 3
                    ? action.payload.password
                    : user.password,
                role: action.payload.role,
              }
            : user
        ),
      ];
    case DELETE_USER:
      return [...state.filter((user) => user.id !== action.payload)];
    default:
      return state;
  }
};

export const userReducers = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      // TODO - Empty object
      return action.payload;

    default:
      return state;
  }
};

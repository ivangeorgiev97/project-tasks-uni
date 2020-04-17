import usersState from "./users/initialState";
import tasksState from "./tasks/initialState";

export default {
    ...usersState,
    ...tasksState
}

import { combineReducers } from 'redux'
import { usersReducers, userReducers } from './users/reducers'
import tasksReducers from './tasks/reducers'

export default combineReducers({
    users: usersReducers,
    currentUser: userReducers,
    tasks: tasksReducers
})

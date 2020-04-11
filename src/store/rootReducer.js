import { combineReducers } from 'redux'
import usersReducers from './users/reducers'
import tasksReducers from './tasks/reducers'

export default combineReducers({
    usersReducers,
    tasksReducers
})

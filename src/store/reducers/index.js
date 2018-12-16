import { combineReducers } from 'redux'

import authReducer from './auth'
import boardsReducer from './boards'

const rootReducer = combineReducers({
  auth: authReducer,
  boards: boardsReducer
})

export default rootReducer

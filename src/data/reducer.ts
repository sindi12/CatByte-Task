import { combineReducers } from 'redux'

import { reducer as homeReducer } from './slices/users'

export const rootReducer = combineReducers({
  home: homeReducer,
})

import { combineReducers } from 'redux'
import counter from './counter'
import area from './area'

export default combineReducers({
  counter,
  area
})

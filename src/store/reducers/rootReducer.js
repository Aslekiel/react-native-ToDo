import {combineReducers} from '@reduxjs/toolkit';
import todos from './todos';

const rootReducer = combineReducers({
  todos: todos,
});

export default rootReducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todos = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodosFromStorage(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(elem => elem.id !== action.payload);
    },
    getCompletedTodo(state, action) {
      state.todos.forEach(item => {
        if (action.payload.id !== item.id) {
          return;
        }
        item.isCompleted = !item.isCompleted;
      });
    },
    editTodo(state, action) {
      state.todos.forEach(item => {
        if (action.payload.todo.id !== item.id) {
          return;
        }
        item.title = action.payload.editedTodo;
      });
    },
  },
});

export const {
  addTodosFromStorage,
  addTodo,
  removeTodo,
  getCompletedTodo,
  editTodo,
} = todos.actions;

export default todos.reducer;

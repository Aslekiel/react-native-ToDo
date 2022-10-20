import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch} from 'react-redux';
import {editTodo, getCompletedTodo, removeTodo} from '../store/reducers/todos';
import getTodosFromStorage from '../utils/getTodosFromStorage';

const checkboxEmpty = 'checkbox-blank-circle-outline';
const checkboxMarked = 'checkbox-marked-circle-outline';

const TodoItem = ({todo}) => {
  const [edit, setEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo.title);
  const dispatch = useDispatch();

  const editTodoHandler = value => {
    setEditedTodo(value.nativeEvent?.text);
  };

  const completeTodoHandler = async () => {
    const savedTodos = await getTodosFromStorage();
    savedTodos.forEach(item => {
      if (item.id !== todo.id) {
        return;
      }
      item.isCompleted = !item.isCompleted;
    });

    await AsyncStorage.setItem('todos', JSON.stringify(savedTodos));
    dispatch(getCompletedTodo(todo));
  };

  const removeTodoHandler = async () => {
    const savedTodos = await getTodosFromStorage();
    const undeletedTodos = savedTodos.filter(item => item.id !== todo.id);

    await AsyncStorage.setItem('todos', JSON.stringify(undeletedTodos));

    dispatch(removeTodo(todo.id));
  };

  const onSubmit = async () => {
    if (!editedTodo.trim()) {
      return;
    }

    const savedTodos = await getTodosFromStorage();
    savedTodos.forEach(item => {
      if (item.id !== todo.id) {
        return;
      }
      item.title = editedTodo;
    });

    await AsyncStorage.setItem('todos', JSON.stringify(savedTodos));

    dispatch(editTodo({editedTodo, todo}));

    setEdit(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonComplete}
        onPress={completeTodoHandler}>
        <MaterialCommunityIcons
          name={todo.isCompleted ? checkboxMarked : checkboxEmpty}
          color={'rgba(175, 47, 47, 0.55)'}
          size={26}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.todoTitleContainer}
        onLongPress={() => setEdit(!edit)}>
        {edit ? (
          <TextInput
            value={editedTodo}
            onChange={editTodoHandler}
            onSubmitEditing={onSubmit}
            style={styles.todoInput}
          />
        ) : (
          <Text style={styles.todoTitle}>{todo.title}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={removeTodoHandler}>
        <MaterialCommunityIcons
          name="window-close"
          color={'rgba(175, 47, 47, 0.55)'}
          size={26}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 5,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(175, 47, 47, 0.15)',
    borderRadius: 20,

    backgroundColor: 'rgba(0, 0, 0, 0.003)',
    shadowColor: 'inset 0 -2px 1px rgba(0, 0, 0, 0.03)',
  },
  todoTitleContainer: {
    width: '70%',
  },
  todoTitle: {
    fontSize: 20,
  },
  buttonComplete: {
    paddingRight: 5,
  },
  todoInput: {
    fontSize: 20,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.003)',
  },
});

export default TodoItem;

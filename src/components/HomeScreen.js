import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useSelector, useDispatch} from 'react-redux';
import {addTodo, addTodosFromStorage} from '../store/reducers/todos';
import {nanoid} from '@reduxjs/toolkit';

import getTodosFromStorage from '../utils/getTodosFromStorage';

const HomeScreen = () => {
  const [todoTitle, setTodoTitle] = useState('');

  const {todos} = useSelector(state => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const savedTodos = await getTodosFromStorage();

      if (savedTodos) {
        dispatch(addTodosFromStorage(savedTodos));
      }
    })();
  }, [dispatch]);

  const onChangeText = value => {
    setTodoTitle(value.nativeEvent.text);
  };

  const onSubmit = async () => {
    try {
      if (!todoTitle.trim()) {
        return;
      }

      const newTodo = {
        id: nanoid(),
        title: todoTitle,
        isCompleted: false,
      };

      dispatch(addTodo(newTodo));

      const todosWithNewTodo = [...todos, newTodo];

      await AsyncStorage.setItem('todos', JSON.stringify(todosWithNewTodo));

      setTodoTitle('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>todos</Text>
      <TextInput
        style={styles.mainInput}
        value={todoTitle}
        onChange={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="What needs to be done?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mainTitle: {
    fontSize: 100,
    color: 'rgba(175, 47, 47, 0.15)',
  },
  mainInput: {
    fontSize: 20,
    width: '90%',
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(175, 47, 47, 0.15)',
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.003)',
    shadowColor: 'inset 0 -2px 1px rgba(0, 0, 0, 0.03)',
  },
});

export default HomeScreen;

import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import {useSelector} from 'react-redux';

import TodosList from './TodosList';

const ActiveTodos = () => {
  const {todos} = useSelector(state => state.todos);
  const activeTodos = todos.filter(todo => !todo.isCompleted);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Active</Text>
      <TodosList todos={activeTodos} />
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
    maxHeight: '95%',
  },
  mainTitle: {
    fontSize: 100,
    color: 'rgba(175, 47, 47, 0.15)',
  },
});

export default ActiveTodos;

import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import TodosList from './TodosList';

const CompletedTodos = () => {
  const {todos} = useSelector(state => state.todos);
  const completedTodos = todos.filter(todo => todo.isCompleted);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Completed</Text>
      <TodosList todos={completedTodos} />
    </SafeAreaView>
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
    marginTop: 30,
    marginBottom: 20,
    fontSize: 62,
    color: 'rgba(175, 47, 47, 0.15)',
  },
});

export default CompletedTodos;

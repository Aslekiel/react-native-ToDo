import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import TodosList from './TodosList';

const AllTodos = () => {
  const {todos} = useSelector(state => state.todos);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>All</Text>
      <TodosList todos={todos} />
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

export default AllTodos;

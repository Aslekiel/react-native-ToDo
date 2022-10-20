import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

import TodoItem from './TodoItem';

const renderItem = ({item}) => <TodoItem todo={item} />;

const TodosList = ({todos}) => {
  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
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
});

export default TodosList;

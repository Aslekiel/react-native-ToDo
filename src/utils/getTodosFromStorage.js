import AsyncStorage from '@react-native-async-storage/async-storage';

const getTodosFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('todos');
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.log(err);
  }
};

export default getTodosFromStorage;

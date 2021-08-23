import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_QUERY = 'ADD_QUERY';
export const FETCH_QUERIES = 'FETCH_QUERIES';

export const addQuery = (query) => {
  return (dispatch, getState) => {
    dispatch({type: ADD_QUERY, query});
    AsyncStorage.setItem(
      'queries',
      JSON.stringify({queries: getState().history.queries}),
    );
  };
};

export const fetchQueries = () => {
  return async (dispatch) => {
    const savedData = await AsyncStorage.getItem('queries');
    if (savedData) {
      const queries = JSON.parse(savedData).queries;
      dispatch({type: FETCH_QUERIES, queries});
    }
  };
};

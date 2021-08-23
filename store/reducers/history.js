import {ADD_QUERY, FETCH_QUERIES} from '../actions/history';

const initialState = {
  queries: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUERY:
      const queriesCopy = [...state.queries];
      if (queriesCopy.length === 5) queriesCopy.pop();
      const query =
        action.query.length > 22
          ? action.query.slice(0, 19) + '...'
          : action.query;
      queriesCopy.unshift(query);
      return {queries: queriesCopy};

    case FETCH_QUERIES:
      return {queries: action.queries};

    default:
      return state;
  }
};
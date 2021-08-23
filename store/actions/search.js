export const FETCH_DATA = 'FETCH_DATA';

const BASE_URL = 'https://api.github.com/search';
const BASE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

export const fetchData = (query, type) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${
          type ? 'repositories?q=' : 'users?q=type:org%20'
        }${query}`,
        {
          method: 'GET',
          headers: BASE_HEADERS,
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();

      dispatch({type: FETCH_DATA, result, itemType: type});
    } catch (err) {
      throw new Error(err.message);
    }
  };
};
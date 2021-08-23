import React from 'react';
import {StatusBar} from 'react-native';
import MainScreen from './screens/MainScreen';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import searchReducer from './store/reducers/search';
import historyReducer from './store/reducers/history';

const rootReducer = combineReducers({
  search: searchReducer,
  history: historyReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <MainScreen />
    </Provider>
  );
};

export default App;
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import SearchHistory from '../components/SearchHistory';
import Card from '../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import * as searchActions from '../store/actions/search';
import * as historyActions from '../store/actions/history';

const MainScreen = () => {
  const [inputValue, setInputValue] = useState('')
  const [type, setType] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const data = useSelector(state => state.search.items);
  const dispatch = useDispatch();
  
  const saveQuery = () => {
  if (inputValue) {
      dispatch(historyActions.addQuery(inputValue));
  }
  };

  useEffect(()=>{
  if (inputValue) {
    setIsLoading(true);
      dispatch(searchActions.fetchData(inputValue, type))
        .catch((err) => Alert.alert('Error!', err.message, [{text: 'Ok', style: 'destructive'}]))
        .finally(() => setIsLoading(false));
  }
  }, [inputValue, type])

  useEffect(() => {
      dispatch(historyActions.fetchQueries())
  }, [])

  return (
      <View style={styles.screen}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={(value) => setInputValue(value)}
          onBlur={saveQuery}
          placeholder={`Search for ${type ? 'repositories' : 'organizations'}...`}
        />
        <View style={styles.searchOptions}>
          <SearchHistory />
          <TouchableOpacity style={styles.button} onPress={() => setType(!type)}>
            <Text style={styles.buttonText}>
              {type ? 'Repositories' : 'Organizations'}
            </Text>
          </TouchableOpacity>
        </View>
        {!isLoading ? (
          inputValue ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={(itemData) => <Card item={itemData.item} type={type} />}
            />
          ) : (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>Results will be here</Text>
            </View>
          )
        ) : (
          <View style={styles.messageContainer}>
            <ActivityIndicator color='white' size='large' />
          </View>
        )}
      </View>
    );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#333',
    height: '100%',
    padding: 10,
  },
  input: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  searchOptions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  button: {
    width: '38%',
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    color: '#fff',
  },
});

export default MainScreen;
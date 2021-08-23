import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const SearchHistory = () => {
  const [isShown, setIsShown] = useState(false);
  const history = useSelector((state) => state.history.queries);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsShown(!isShown)}>
        <Text style={styles.buttonText}>{`${
          isShown ? 'Hide' : 'Show'
        } search history`}</Text>
      </TouchableOpacity>
      {isShown && (
        <View style={styles.historyContainer}>
          {history.map((query, index) => (
            <Text key={query + index} style={styles.query}>
              {query}
            </Text>
          ))}
          {history.length === 0 && (
            <Text style={styles.query}>No history yet</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  historyContainer: {
    width: '85%',
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  query: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

export default SearchHistory;
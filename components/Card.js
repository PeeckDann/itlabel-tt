import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = ({item, type}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      {type && (
        <Text style={styles.header}>
          Language:{' '}
          <Text style={{...styles.header, ...styles.info}}>
            {item.language ? item.language : 'not specified'}
          </Text>
        </Text>
      )}
      {type && (
        <Text style={styles.header}>
          Description:{' '}
          <Text style={{...styles.header, ...styles.info}}>
            {item.description ? item.description : 'not specified'}
          </Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 22,
    marginBottom: 10,
  },
  header: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    fontWeight: 'normal',
    fontSize: 15,
  },
});

export default Card;
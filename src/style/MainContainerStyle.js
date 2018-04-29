import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-navigation';

const MainContainerStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#C0C0C0',
    marginTop: Header.HEIGHT,
  },
  containerNoSpaceAround: {
    flex: 1,
    backgroundColor: '#C0C0C0',
    marginTop: Header.HEIGHT,
  },
});


export default MainContainerStyle;

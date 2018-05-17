import React from 'react';
import { StyleSheet } from 'react-native';


const OfTheDayFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  difficultyContainer: {
    flex: 1,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
  },
  selectedDifficultyText: {
    color: '#ffca28',
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
  },
});


export default OfTheDayFooterStyle;

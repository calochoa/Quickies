import React from 'react';
import { StyleSheet } from 'react-native';


const QuickieOfTheDayRowStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  qotdType: {
    fontSize: 24,    
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Cochin',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  difficultyRowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  difficultyContainer: {
    margin: 3,
  },
});


export default QuickieOfTheDayRowStyle;

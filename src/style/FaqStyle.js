import React from 'react';
import { StyleSheet } from 'react-native';


const FaqStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    borderColor: '#4072b8',
  },
  question: {
    fontSize: 24,    
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Cochin',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  answerContainer: {
    flex: 2,
    marginLeft: 10,
  },
  answer: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Cochin',
  },
});


export default FaqStyle;

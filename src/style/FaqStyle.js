import React from 'react';
import { StyleSheet } from 'react-native';


const FaqStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  question: {
    fontSize: 24,    
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Gill Sans',
    textDecorationLine: 'underline',
  },
  answerContainer: {
    flex: 2,
    marginLeft: 10,
  },
  answer: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Gill Sans',
  },
});


export default FaqStyle;

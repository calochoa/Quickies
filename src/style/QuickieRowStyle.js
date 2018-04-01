import React from 'react';
import { StyleSheet } from 'react-native';


const QuickieRowStyle = StyleSheet.create({
  container: {
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  subContainer: {
    flex: 1,
    alignItems: 'center', 
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  difficultyContainer: {
    flex: 5,
  },
  imgRowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 10,
  },
  nextLevelContainer: {
    flex: 1,
    marginRight: 5,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cochin',
    marginBottom: 5,
  },
  info: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Cochin',
  },
});


export default QuickieRowStyle;

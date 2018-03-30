import React from 'react';
import { StyleSheet } from 'react-native';


const ExercisesRowStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
    margin: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  nameContainer: {
    flex: 10,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});


export default ExercisesRowStyle;

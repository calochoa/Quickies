import React from 'react';
import { StyleSheet } from 'react-native';


const ExercisesRowStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
    margin: 10,
    borderRadius: 15, 
  },
  nameContainer: {
    flex: 10,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Gill Sans',
  },
});


export default ExercisesRowStyle;

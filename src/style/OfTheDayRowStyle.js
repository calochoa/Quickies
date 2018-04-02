import React from 'react';
import { StyleSheet } from 'react-native';


const OfTheDayRowStyle = StyleSheet.create({
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
    //fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  divider: {
    borderBottomColor: '#fff', 
    borderBottomWidth: 1, 
    alignSelf: 'stretch', 
    margin: 10,
  },
});


export default OfTheDayRowStyle;

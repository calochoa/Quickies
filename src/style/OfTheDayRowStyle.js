import React from 'react';
import { StyleSheet } from 'react-native';


const OfTheDayRowStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15, 
  },
  qotdType: {
    fontSize: 28,    
    color: '#fff',
    fontFamily: 'Gill Sans',
  },
  divider: {
    borderBottomColor: '#fff', 
    borderBottomWidth: 1, 
    alignSelf: 'stretch', 
    margin: 10,
  },
});


export default OfTheDayRowStyle;

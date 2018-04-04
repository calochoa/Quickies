import React from 'react';
import { StyleSheet } from 'react-native';


const MainRowStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 15, 
  },
  extra15Margin: {
    margin: 15,
  },
  titleContainer: {
    flex: 8,
  },
  infoLevelContainer: {
    flex: 1,
  },
  nextLevelContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Gill Sans',
  },
});


export default MainRowStyle;

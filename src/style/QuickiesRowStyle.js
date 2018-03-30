import React from 'react';
import { StyleSheet } from 'react-native';


const QuickiesRowStyle = StyleSheet.create({
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
  detailsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  difficultyContainer: {
    flex: 4,
  },
  imgRowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgContainer: {
    margin: 3,
  },
  infoContainer: {
    width: 220,
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


export default QuickiesRowStyle;

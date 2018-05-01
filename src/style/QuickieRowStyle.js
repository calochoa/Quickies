import React from 'react';
import { StyleSheet } from 'react-native';


const QuickieRowStyle = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15, 
  },
  subContainer: {
    flex: 1,
    alignItems: 'center', 
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
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
  nameContainer: {
    marginBottom: 5,
    flex: 10,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Gill Sans',
  },
  variation: {
    color: '#C0C0C0',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Gill Sans',
  },
  info: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Gill Sans',
  },
});


export default QuickieRowStyle;

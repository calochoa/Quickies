import React from 'react';
import { StyleSheet } from 'react-native';


const QuickiesHeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  levelContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  levelText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gill Sans',
  },
  selectedLevelText: {
    color: '#ffca28',
    fontSize: 16,
    fontFamily: 'Gill Sans',
  },
});


export default QuickiesHeaderStyle;

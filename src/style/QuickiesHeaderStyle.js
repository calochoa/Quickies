import React from 'react';
import { StyleSheet } from 'react-native';


const QuickiesHeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  levelInfoContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  levelContainer: {
    flex: 1,
  },
  levelText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
  },
  selectedLevelText: {
    color: '#ffca28',
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
  },
  modeContainer: {
    flex: 1,
    alignItems: 'flex-end', 
  },
});


export default QuickiesHeaderStyle;

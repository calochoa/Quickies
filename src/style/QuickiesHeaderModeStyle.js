import React from 'react';
import { StyleSheet } from 'react-native';


const QuickiesHeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  qModeContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  modeInfoText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gill Sans',
  },
  modeText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Gill Sans',
  },
  selectedModeText: {
    color: '#ffca28',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Gill Sans',
  },
});


export default QuickiesHeaderStyle;

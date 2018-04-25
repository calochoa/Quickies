import React from 'react';
import { StyleSheet } from 'react-native';


const QuickiesFooterStyle = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  qModeContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'flex-end',
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Gill Sans',
  },
});


export default QuickiesFooterStyle;

import React from 'react';
import { StyleSheet } from 'react-native';


const QuickiesFooterStyle = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
  },
  qBodySplitContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'flex-end',
    paddingTop: 2,
  },
  bodySplitText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Gill Sans',
  },
  selectedBodySplitText: {
    color: '#ffca28',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Gill Sans',
  },
});


export default QuickiesFooterStyle;

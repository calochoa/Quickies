import React from 'react';
import { StyleSheet } from 'react-native';


const OverlayStyle = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(119, 146, 173, 0.78)',
  },
  wrapper: {
    backgroundColor: '#f1f1f1', 
    borderRadius: 15,
  },
  header: {
    textAlign: 'center', 
    fontSize: 22, 
    fontFamily: 'Gill Sans',
  },
  subheader: {
    textAlign: 'center', 
    paddingBottom: 5,
    fontSize: 16, 
    fontFamily: 'Gill Sans',
  },
  divider: {
    borderBottomColor: 'black', 
    borderBottomWidth: 1, 
    alignSelf: 'stretch', 
    margin: 10,
  },
  text: {
    fontSize: 14, 
    fontFamily: 'Gill Sans',
  },
});


export default OverlayStyle;

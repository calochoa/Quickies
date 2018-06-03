import React from 'react';
import { StyleSheet } from 'react-native';


const WorkoutsHeaderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  levelInfoContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center', 
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
});


export default WorkoutsHeaderStyle;

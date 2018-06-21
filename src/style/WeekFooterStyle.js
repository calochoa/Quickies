import React from 'react';
import { StyleSheet } from 'react-native';


const WeekFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  weekContainer: {
    flex: 3,
    alignItems: 'center', 
    paddingTop: 2,
    paddingBottom: 2,
  },
  weekText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    paddingTop: 2,
  },
  selectedWeekText: {
    color: '#ffca28',
    fontSize: 13,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    paddingTop: 2,
  },
});


export default WeekFooterStyle;

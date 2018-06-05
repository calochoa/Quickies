import React from 'react';
import { StyleSheet } from 'react-native';


const OfTheDayFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  dayInfoContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingTop: 2,
    paddingBottom: 2,
  },
  dayContainer: {
    flex: 3,
    alignItems: 'center', 
    paddingTop: 2,
    paddingBottom: 2,
  },
  dayText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    paddingTop: 2,
  },
  selectedDayText: {
    color: '#ffca28',
    fontSize: 13,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    paddingTop: 2,
  },
});


export default OfTheDayFooterStyle;

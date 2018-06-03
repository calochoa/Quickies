import React from 'react';
import { StyleSheet } from 'react-native';


const OfTheDayFooterStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  dayInfoContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 2,
  },
  dayText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
  },
  selectedDayText: {
    color: '#ffca28',
    fontSize: 16,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
  },
});


export default OfTheDayFooterStyle;

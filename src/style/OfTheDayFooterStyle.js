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
  },
  dayContainer: {
    flex: 3,
    alignItems: 'center', 
    paddingTop: 5,
    paddingBottom: 5,
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

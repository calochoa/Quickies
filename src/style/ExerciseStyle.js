import React from 'react';
import {
  Dimensions,
  StyleSheet, 
} from 'react-native';


const win = Dimensions.get('window');
const ratio = win.width/360; //360 is actual width of video

const ExerciseStyle = StyleSheet.create({
  video: {
    width: win.width,
    height: 360 * ratio, //360 is actual height of video
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#0276c9',
    margin: 20,
  },
  infoContainer: {
    margin: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    //fontFamily: 'Cochin',
  },
  info: {
    fontSize: 18,    
    color: '#fff',
    marginLeft: 10,
    //fontFamily: 'Cochin',
  },
});


export default ExerciseStyle;

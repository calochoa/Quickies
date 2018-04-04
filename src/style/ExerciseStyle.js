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
    margin: 20,
  },
  infoContainer: {
    margin: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Gill Sans',
  },
  info: {
    fontSize: 18,    
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Gill Sans',
  },
});


export default ExerciseStyle;

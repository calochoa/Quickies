import React from 'react';
import {
  Dimensions,
  StyleSheet, 
} from 'react-native';


const win = Dimensions.get('window');
const ratio = win.width/360; //360 is actual width of video

const QuickieStyle = StyleSheet.create({
  videosContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  video: {
    flex: 1,
    width: win.width,
    height: 360 * ratio / 2, //360 is actual height of video, but half the size
    backgroundColor: '#000',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#0276c9',
    margin: 20,
  },
  infoContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#0276c9',
  },
  infoTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  info: {
    fontSize: 18,    
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Cochin',
  },
});


export default QuickieStyle;

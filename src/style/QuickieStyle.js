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
    margin: 20,
  },
  infoContainer: {
    padding: 10,
  },
  infoTitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Gill Sans',
  },
  infoTitle2: {
    marginTop: 10,
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


export default QuickieStyle;

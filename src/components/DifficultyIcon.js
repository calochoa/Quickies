import React from 'react';
import { Image } from 'react-native';
import DifficultyStyle from '../style/DifficultyStyle';


class DifficultyIcon extends React.Component {
  render() {
    return (
      <Image
      	style={DifficultyStyle.imgContainer} 
        source={require('../images/icons8-speed-24.png')}
      />
    );
  }
}


export default DifficultyIcon;

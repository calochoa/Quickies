import React from 'react';
import { Image } from 'react-native';
import DifficultyStyle from '../style/DifficultyStyle';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';


class DifficultyIcon extends React.Component {
  constructor(props) {
    super(props);

    qMode = (typeof this.props.qMode != 'undefined') ? this.props.qMode : 'Standard'
    
    this.state = {
      difficultyImage: difficultyImagePathMap.get(qMode),
    };
  }

  render() {
    const { difficultyImage } = this.state;

    return (
      <Image
        style={DifficultyStyle.imgContainer} 
        source={difficultyImage}
      />
    );
  }
}


export default DifficultyIcon;

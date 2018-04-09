import React from 'react';
import { Image } from 'react-native';
import DifficultyStyle from '../style/DifficultyStyle';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';


class DifficultyIcon extends React.Component {
  constructor(props) {
    super(props);

    qVariation = (typeof this.props.qVariation != 'undefined') ? this.props.qVariation : 'default'
    
    this.state = {
      difficultyImage: difficultyImagePathMap.get(qVariation),
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

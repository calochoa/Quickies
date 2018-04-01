import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
} from 'react-native';
import Exercises from '../dbstore/Exercises.json';
import DifficultyIcon from '../components/DifficultyIcon';
import ForwardIcon from '../components/ForwardIcon';
import QuickieRowStyle from '../style/QuickieRowStyle';


const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});


class QuickieRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quickie: this.props.quickie,
    };
  }

  _getDifficultyImg(totalImages) {
    let difficultyImg = []
    let numImages = []
    for (let i = 0; i < totalImages; i++) {
      numImages.push(<DifficultyIcon key={i}/>)
      if ((i == 1 && totalImages < 6) || (i == 2 && totalImages == 6)) {
        difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='1'>{numImages}</View>)
        numImages = []
      }
    }
    difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='2'>{numImages}</View>)
    return difficultyImg
  }

  render() {
    const { quickie } = this.state;

    return (
      <View style={QuickieRowStyle.subContainer}>
        <Text style={QuickieRowStyle.name}>{quickie.qName}</Text>
        <View style={QuickieRowStyle.detailsContainer}>
          <View style={QuickieRowStyle.difficultyContainer}>
            {this._getDifficultyImg(quickie.qDifficulty)}
          </View>
          <View style={QuickieRowStyle.infoContainer}>
            <Text style={QuickieRowStyle.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
            <Text style={QuickieRowStyle.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
            <Text style={QuickieRowStyle.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
            <Text style={QuickieRowStyle.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
          </View>
          <TouchableOpacity 
            style={QuickieRowStyle.nextLevelContainer} 
            onPress={() => {
              this.props.navigation.navigate('Quickie', {
                quickieId: quickie.qId,
                quickieName: quickie.qName,
              });
            }}
          >
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}


export default QuickieRow;

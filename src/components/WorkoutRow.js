import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity,
} from 'react-native';
import Quickies from '../dbstore/Quickies.json';
import DifficultyIcon from '../components/DifficultyIcon';
import ForwardIcon from '../components/ForwardIcon';
import QuickieRowStyle from '../style/QuickieRowStyle';


const QuickiesMap = new Map();
Quickies.map(element => {
  QuickiesMap.set(element.qId, element.qName);
});


class WorkoutRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workout: this.props.workout,
    };
  }

  _getDifficultyImg(totalImages) {
    let difficultyImg = []
    for (let i = 0; i < totalImages; i++) {
      difficultyImg.push(
        <View style={QuickieRowStyle.imgRowContainer} key={i}>
          <DifficultyIcon />
        </View>
      )
    }
    return difficultyImg
  }

  _getQuickiesDisplay(quickies) {
    let quickiesDisplay = [];
    for (let i=0; i < quickies.length; i++) {
      quickiesDisplay.push(
        <Text style={QuickieRowStyle.info} key={i}>
          {i+1}. {QuickiesMap.get(quickies[i])}
        </Text>
      )
    }
    return quickiesDisplay;
  }

  render() {
    const { workout } = this.state;

    return (
      <View style={QuickieRowStyle.subContainer} >
        <Text style={QuickieRowStyle.name}>{workout.wName}</Text>
        <View style={QuickieRowStyle.detailsContainer}>
          <View style={QuickieRowStyle.difficultyContainer}>
            {this._getDifficultyImg(workout.wDifficulty)}
          </View>
          <View style={QuickieRowStyle.infoContainer}>
            {this._getQuickiesDisplay(workout.qIds)}
          </View>
          <TouchableOpacity 
            style={QuickieRowStyle.nextLevelContainer}
            onPress={() => {
              this.props.navigation.navigate('Workout', {
                workoutId: workout.wId,
                workoutName: workout.wName,
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


export default WorkoutRow;

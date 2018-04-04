import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity,
} from 'react-native';
import WorkoutLevels from '../dbstore/WorkoutLevels.json';
import Quickies from '../dbstore/Quickies.json';
import DifficultyIcon from '../components/DifficultyIcon';
import ForwardIcon from '../components/ForwardIcon';
import QuickieRowStyle from '../style/QuickieRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';


const workoutLevelMap = new Map();
WorkoutLevels.map(element => {
  workoutLevelMap.set(element.wlId, element);
})

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

  setModalVisible(wName, visible) {
    const update = {}
    update[wName] = visible
    this.setState(update);
  }

  renderOverlay(wName, wDifficulty) {
    workoutLevel = workoutLevelMap.get('wl'+wDifficulty)
    return (
      <Overlay 
        visible={this.state[wName]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(wName, false);}}
      >
        <Text style={OverlayStyle.header}>{workoutLevel.wlName}</Text>
        <View style={OverlayStyle.divider}/>
        <Text>{workoutLevel.wlDescription}</Text>
      </Overlay>
    )
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
        {this.renderOverlay(workout.wName, workout.wDifficulty)}
        <Text style={QuickieRowStyle.name}>{workout.wName}</Text>
        <View style={QuickieRowStyle.detailsContainer}>
          <TouchableOpacity 
            style={QuickieRowStyle.difficultyContainer}
            onPress={() => {this.setModalVisible(workout.wName, true);}}
          >
            {this._getDifficultyImg(workout.wDifficulty)}
          </TouchableOpacity>
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

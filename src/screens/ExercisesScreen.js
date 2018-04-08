import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import ExerciseTypes from '../dbstore/ExerciseTypes.json';
import Exercises from '../dbstore/Exercises.json';
import MenuIcon from '../components/MenuIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import ExercisesRowStyle from '../style/ExercisesRowStyle';


const ExerciseTypesMap = new Map();
ExerciseTypes.map(element => {
  ExerciseTypesMap.set(element.etName, element.etId);
})


class ExercisesScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.exerciseType + ' Exercises' : 'Exercises',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    let filteredData = []
    let exerciseTypeId = ExerciseTypesMap.get(params.exerciseType)
    Exercises.map(element => {
      element.eTypes.map(eType => {
        if (eType === exerciseTypeId) {
          filteredData.push(element);
        }
      })
      if (params.exerciseType === 'All') {
        filteredData.push(element);
      }
    });

    filteredData = filteredData.sort((a,b) => {
      if (a.eName.toLowerCase() < b.eName.toLowerCase()) {
        return -1;
      }
      if (a.eName.toLowerCase() > b.eName.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    this.state = {
      filteredData: filteredData, 
    };
  }

  renderRow(exercise) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={ExercisesRowStyle.container} 
        key={exercise.eId}
      >
        <View style={ExercisesRowStyle.nameContainer}>
          <Text style={ExercisesRowStyle.name}>{exercise.eName}</Text>
        </View>
        <TouchableOpacity 
          style={MainRowStyle.nextLevelContainer}
          onPress={() => {
            this.props.navigation.navigate('Exercise', {
              exerciseId: exercise.eId,
              exerciseName: exercise.eName,
            });
          }}
        >
          <ForwardIcon />
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  render() {
    const { filteredData } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          {filteredData.map((exercise) => this.renderRow(exercise))}
        </ScrollView>
      </View>
    );
  }
}


export default ExercisesScreen;

import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  ScrollView, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Workouts from '../dbstore/Workouts.json';
import WorkoutTypes from '../dbstore/WorkoutTypes.json';
import MenuIcon from '../components/MenuIcon';
import WorkoutRow from '../components/WorkoutRow';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieRowStyle from '../style/QuickieRowStyle';


const WorkoutTypesMap = new Map();
WorkoutTypes.map(element => {
  WorkoutTypesMap.set(element.wtName, element.wtId);
})


class WorkoutsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let workoutType = params ? params.workoutType + ' Workouts' : 'Workouts'
    if (workoutType.length > 20) {
      workoutType = workoutType.replace('Workout', 'WO')
    }

    return {
      title: workoutType,
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
    let workoutTypeId = WorkoutTypesMap.get(params.workoutType)
    Workouts.map(element => {
      if (element.wtId === workoutTypeId) {
        filteredData.push(element);
      }
    });

    this.state = {
      filteredData : filteredData,
    };
  }

  _renderRow(workout) {
    return (
      <LinearGradient 
        colors={['#4c669f', '#0276c9', '#192f6a']} 
        style={QuickieRowStyle.container} 
        key={workout.wId}
      >
        <WorkoutRow workout={workout} navigation={this.props.navigation} />
      </LinearGradient>
    );
  }

  render() {
    const { filteredData } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          {filteredData.map((workout) => this._renderRow(workout))}
        </ScrollView>
      </View>
    );
  }
}


export default WorkoutsScreen;

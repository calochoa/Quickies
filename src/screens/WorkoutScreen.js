import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  ScrollView, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Workouts from '../dbstore/Workouts.json';
import Quickies from '../dbstore/Quickies.json';
import WorkoutTypes from '../dbstore/WorkoutTypes.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieRowStyle from '../style/QuickieRowStyle';


const WorkoutTypesMap = new Map();
WorkoutTypes.map(element => {
  WorkoutTypesMap.set(element.wtId, element.wtName);
})


class WorkoutScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let workoutName = 'Workout'
    if (params) {
      let wtId = ''
      Workouts.map(element => {
        if (element.wId === params.workoutId) {
          workoutName = WorkoutTypesMap.get(element.wtId) + ' ' + params.workoutName
          if (workoutName.length > 20) {
            workoutName = workoutName.replace('Workout', 'WO')
          }
        }
      });
    }

    return {
      title: workoutName,
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

    let workoutQuickies = [];
    Workouts.map(element => {
      if (element.wId === params.workoutId) {
        workoutQuickies = element.qIds;
      }
    });

    let filteredData = new Array(workoutQuickies.length);
    Quickies.map(element => {
      let index = workoutQuickies.indexOf(element.qId);
      if (index != -1) {
        filteredData[index] = element;
      }
    });

    this.state = {
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(quickie) {
    let qMode = 'Standard'
    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={QuickieRowStyle.container} 
        key={quickie.qId}
      >
        <QuickieRow quickie={quickie} qMode={qMode} navigation={this.props.navigation} key={quickie.qId} />
      </LinearGradient>
    );
  }

  render() {
    const { filteredData } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          {filteredData.map((quickie) => this.renderRow(quickie))}
        </ScrollView>
      </View>
    );
  }
}


export default WorkoutScreen;

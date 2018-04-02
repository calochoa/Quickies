import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
} from 'react-native';
import Workouts from '../dbstore/Workouts.json';
import WorkoutOfTheDayTypes from '../dbstore/WorkoutOfTheDayTypes.json';
import MenuIcon from '../components/MenuIcon';
import WorkoutRow from '../components/WorkoutRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';


const WorkoutOfTheDayTypesMap = new Map();
WorkoutOfTheDayTypes.map(element => {
  WorkoutOfTheDayTypesMap.set(element.wotdId, element.wotdName.toUpperCase());
})


class WorkoutOfTheDayScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'Workout of the Day',
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

    var date = new Date();
    var dayOfTheWeek = date.getDay();

    let filteredData = []
    Workouts.map(element => {
      if (('wotdId' in element) && (dayOfTheWeek == element.wotdOrder)) {
        filteredData.push(element);
      }
    });
    filteredData = filteredData.sort((a,b) => {
        if (a.wotdId < b.wotdId) {
          return -1;
        }
        if (a.wotdId > b.wotdId) {
          return 1;
        }
        return 0;
      });

    this.state = {
      filteredData: filteredData,
      headerTitle: this.props.headerTitle,
    };
  }

  _renderRow(workout) {
    return (
      <View style={OfTheDayRowStyle.container} key={workout.wId}>
        <Text style={OfTheDayRowStyle.qotdType}>{WorkoutOfTheDayTypesMap.get(workout.wotdId)}</Text>
        <View style={OfTheDayRowStyle.divider}/>
        <WorkoutRow workout={workout} navigation={this.props.navigation} />
      </View>
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


export default WorkoutOfTheDayScreen;

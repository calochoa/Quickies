import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Workouts from '../dbstore/Workouts.json';
import WorkoutOfTheDay from '../dbstore/WorkoutOfTheDay.json';
import OfTheDay from '../dbstore/OfTheDay.json';
import MenuIcon from '../components/MenuIcon';
import WorkoutRow from '../components/WorkoutRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';
import OfTheDayHeader from '../components/OfTheDayHeader';
import OfTheDayFooter from '../components/OfTheDayFooter';


const WorkoutMap = {}
Workouts.map(element => {
  WorkoutMap[element.wId] = element;
})

const OfTheDayMap = {}
OfTheDay.map(element => {
  OfTheDayMap[element.otdId] = element;
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

  sortOrder(filteredData) {
    return filteredData.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
  }

  constructor(props) {
    super(props);

    let maxDays = 7;
    let maxDifficulty = 5;
    let wotdMap = {};
    for (i = 0; i < maxDays; i++) {
      for (j = 0; j <= maxDifficulty; j++) {
        wotdMap['wotd_'+i+'.otd000'+j] = [];
      }
    }

    this.sortOrder(WorkoutOfTheDay).map(element => {
      wotdMap['wotd_0.otd0000'].push({key:element.wotd_0, otdId:element.otdId})
      wotdMap['wotd_1.otd0000'].push({key:element.wotd_1, otdId:element.otdId})
      wotdMap['wotd_2.otd0000'].push({key:element.wotd_2, otdId:element.otdId})
      wotdMap['wotd_3.otd0000'].push({key:element.wotd_3, otdId:element.otdId})
      wotdMap['wotd_4.otd0000'].push({key:element.wotd_4, otdId:element.otdId})
      wotdMap['wotd_5.otd0000'].push({key:element.wotd_5, otdId:element.otdId})
      wotdMap['wotd_6.otd0000'].push({key:element.wotd_6, otdId:element.otdId})
      wotdMap['wotd_0.'+element.otdId].push({key:element.wotd_0, otdId:element.otdId})
      wotdMap['wotd_1.'+element.otdId].push({key:element.wotd_1, otdId:element.otdId})
      wotdMap['wotd_2.'+element.otdId].push({key:element.wotd_2, otdId:element.otdId})
      wotdMap['wotd_3.'+element.otdId].push({key:element.wotd_3, otdId:element.otdId})
      wotdMap['wotd_4.'+element.otdId].push({key:element.wotd_4, otdId:element.otdId})
      wotdMap['wotd_5.'+element.otdId].push({key:element.wotd_5, otdId:element.otdId})
      wotdMap['wotd_6.'+element.otdId].push({key:element.wotd_6, otdId:element.otdId})
    });

    this.state = {
      wotdMap: wotdMap,
      dayOfTheWeek: new Date().getDay(),
      otdId: 'otd0000',
      wRefresh: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let workout = WorkoutMap[data.key]
    let difficultyName = OfTheDayMap[data.otdId].otdName.toUpperCase()

    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={OfTheDayRowStyle.container} 
        key={workout.wId}
      >
        <Text style={OfTheDayRowStyle.wcType}>{difficultyName}</Text>
        <View style={OfTheDayRowStyle.divider}/>
        <WorkoutRow workout={workout} navigation={this.props.navigation} />
      </LinearGradient>
    );
  }

  setDayOfTheWeek(dayOfTheWeek) {
    const update = {}
    update['dayOfTheWeek'] = dayOfTheWeek
    this.setState(update);
  }

  setDifficultyLevel(otdId) {
    const update = {}
    update['otdId'] = otdId
    this.setState(update);
  }

  render() {
    const { wotdMap, dayOfTheWeek, otdId, wRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <OfTheDayHeader setDifficultyLevel={this.setDifficultyLevel.bind(this)} type='Workout' />
        <FlatList
          data={wotdMap['wotd_'+dayOfTheWeek+'.'+otdId]}
          renderItem={({item}) => this.renderRow(item)}
          extraData={wRefresh}
        />
        <OfTheDayFooter setDayOfTheWeek={this.setDayOfTheWeek.bind(this)} type='Workout' />
      </View>
    );
  }
}


export default WorkoutOfTheDayScreen;

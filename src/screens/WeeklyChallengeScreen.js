import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Quickies from '../dbstore/Quickies.json';
import WeeklyChallenge from '../dbstore/WeeklyChallenge.json';
import OfTheDay from '../dbstore/OfTheDay.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';
import WeekHeader from '../components/WeekHeader';
import WeekFooter from '../components/WeekFooter';


const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
})

const OfTheDayMap = {}
OfTheDay.map(element => {
  OfTheDayMap[element.otdId] = element;
})


class WeeklyChallengeScreen extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'Weekly Challenge',
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

  getPreviousWeekType(currentWeekType, maxTypes) {
    return (currentWeekType == 0 ? maxTypes - 1 : currentWeekType - 1);
  }

  getNextWeekType(currentWeekType, maxTypes) {
    return (currentWeekType == maxTypes - 1 ? 0 : currentWeekType + 1);
  }

  constructor(props) {
    super(props);

    let maxTypes = 14;
    let maxDifficulty = 5;
    let wcMap = {};
    for (i = 0; i < maxTypes; i++) {
      for (j = 0; j <= maxDifficulty; j++) {
        wcMap['wc_'+i+'.otd000'+j] = [];
      }
    }

    this.sortOrder(WeeklyChallenge).map(element => {
      wcMap['wc_0.otd0000'].push({key:element.wc_0, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_1.otd0000'].push({key:element.wc_1, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_2.otd0000'].push({key:element.wc_2, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_3.otd0000'].push({key:element.wc_3, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_4.otd0000'].push({key:element.wc_4, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_5.otd0000'].push({key:element.wc_5, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_6.otd0000'].push({key:element.wc_6, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_7.otd0000'].push({key:element.wc_7, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_8.otd0000'].push({key:element.wc_8, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_9.otd0000'].push({key:element.wc_9, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_10.otd0000'].push({key:element.wc_10, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_11.otd0000'].push({key:element.wc_11, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_12.otd0000'].push({key:element.wc_12, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_13.otd0000'].push({key:element.wc_13, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_0.'+element.wcId].push({key:element.wc_0, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_1.'+element.wcId].push({key:element.wc_1, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_2.'+element.wcId].push({key:element.wc_2, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_3.'+element.wcId].push({key:element.wc_3, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_4.'+element.wcId].push({key:element.wc_4, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_5.'+element.wcId].push({key:element.wc_5, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_6.'+element.wcId].push({key:element.wc_6, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_7.'+element.wcId].push({key:element.wc_7, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_8.'+element.wcId].push({key:element.wc_8, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_9.'+element.wcId].push({key:element.wc_9, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_10.'+element.wcId].push({key:element.wc_10, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_11.'+element.wcId].push({key:element.wc_11, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_12.'+element.wcId].push({key:element.wc_12, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_13.'+element.wcId].push({key:element.wc_13, wcId:element.wcId, wcMode:element.wcMode})
    });

    let currentWeekNumber = require('current-week-number');
    let currentWeekType = currentWeekNumber() % maxTypes;
    let previousWeekType = this.getPreviousWeekType(currentWeekType, maxTypes);
    let nextWeekType = this.getNextWeekType(currentWeekType, maxTypes);

    this.state = {
      wcMap: wcMap,
      weekType: currentWeekType,
      currentWeekType: currentWeekType,
      previousWeekType: previousWeekType,
      nextWeekType: nextWeekType,
      wcId: 'otd0000',
      qRefresh: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let qMode = data.wcMode
    let quickie = QuickieMap[data.key]
    let difficultyName = OfTheDayMap[data.wcId].otdName.toUpperCase()

    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={OfTheDayRowStyle.container} 
        key={quickie.qId+'.'+data.wcId}
      >
        <Text style={OfTheDayRowStyle.wcType}>{difficultyName}</Text>
        <View style={OfTheDayRowStyle.divider}/>
        <QuickieRow quickie={quickie} qMode={qMode} navigation={this.props.navigation} />
      </LinearGradient>
    );
  }

  setWeekType(weekType) {
    const update = {}
    update['weekType'] = weekType
    this.setState(update);
  }

  setDifficultyLevel(wcId) {
    const update = {}
    update['wcId'] = wcId
    this.setState(update);
  }

  render() {
    const { wcMap, weekType, currentWeekType, previousWeekType, nextWeekType, wcId, qRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <WeekHeader setDifficultyLevel={this.setDifficultyLevel.bind(this)} type='Quickie'/>
        <FlatList
          data={wcMap['wc_'+weekType+'.'+wcId]}
          renderItem={({item}) => this.renderRow(item)}
          extraData={qRefresh}
        />
        <WeekFooter 
          setWeekType={this.setWeekType.bind(this)} 
          currentWeekType={currentWeekType} 
          previousWeekType={previousWeekType} 
          nextWeekType={nextWeekType} 
        />
      </View>
    );
  }
}


export default WeeklyChallengeScreen;

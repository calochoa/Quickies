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
import OfTheWeekHeader from '../components/OfTheWeekHeader';
import OfTheWeekFooter from '../components/OfTheWeekFooter';


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

  getPrevWeekType(currentWeekType, maxTypes) {
    return (currentWeekType == 0 ? maxTypes - 1 : currentWeekType - 1);
  }

  getNextWeekType(currentWeekType, maxTypes) {
    return (currentWeekType == maxTypes - 1 ? 0 : currentWeekType + 1);
  }

  constructor(props) {
    super(props);

    let wcMap = {
      'wc_0.otd0000':[], 'wc_0.otd0001':[], 'wc_0.otd0002':[], 'wc_0.otd0003':[], 'wc_0.otd0004':[], 'wc_0.otd0005':[], 
      'wc_1.otd0000':[], 'wc_1.otd0001':[], 'wc_1.otd0002':[], 'wc_1.otd0003':[], 'wc_1.otd0004':[], 'wc_1.otd0005':[], 
      'wc_2.otd0000':[], 'wc_2.otd0001':[], 'wc_2.otd0002':[], 'wc_2.otd0003':[], 'wc_2.otd0004':[], 'wc_2.otd0005':[], 
      'wc_3.otd0000':[], 'wc_3.otd0001':[], 'wc_3.otd0002':[], 'wc_3.otd0003':[], 'wc_3.otd0004':[], 'wc_3.otd0005':[], 
      'wc_4.otd0000':[], 'wc_4.otd0001':[], 'wc_4.otd0002':[], 'wc_4.otd0003':[], 'wc_4.otd0004':[], 'wc_4.otd0005':[], 
      'wc_5.otd0000':[], 'wc_5.otd0001':[], 'wc_5.otd0002':[], 'wc_5.otd0003':[], 'wc_5.otd0004':[], 'wc_5.otd0005':[], 
      'wc_6.otd0000':[], 'wc_6.otd0001':[], 'wc_6.otd0002':[], 'wc_6.otd0003':[], 'wc_6.otd0004':[], 'wc_6.otd0005':[], 
    }

    this.sortOrder(WeeklyChallenge).map(element => {
      wcMap['wc_0.otd0000'].push({key:element.wc_0, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_1.otd0000'].push({key:element.wc_1, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_2.otd0000'].push({key:element.wc_2, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_3.otd0000'].push({key:element.wc_3, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_4.otd0000'].push({key:element.wc_4, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_5.otd0000'].push({key:element.wc_5, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_6.otd0000'].push({key:element.wc_6, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_0.'+element.wcId].push({key:element.wc_0, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_1.'+element.wcId].push({key:element.wc_1, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_2.'+element.wcId].push({key:element.wc_2, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_3.'+element.wcId].push({key:element.wc_3, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_4.'+element.wcId].push({key:element.wc_4, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_5.'+element.wcId].push({key:element.wc_5, wcId:element.wcId, wcMode:element.wcMode})
      wcMap['wc_6.'+element.wcId].push({key:element.wc_6, wcId:element.wcId, wcMode:element.wcMode})
    });

    let maxTypes = 7;
    let currentWeekNumber = require('current-week-number');
    let currentWeekType = currentWeekNumber() % maxTypes;
    let prevWeekType = this.getPrevWeekType(currentWeekType, maxTypes);
    let nextWeekType = this.getNextWeekType(currentWeekType, maxTypes);

    this.state = {
      wcMap: wcMap,
      weekType: currentWeekType,
      currentWeekType: currentWeekType,
      prevWeekType: prevWeekType,
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
        key={quickie.qId}
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
    const { wcMap, currentWeekType, prevWeekType, nextWeekType, wcId, qRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <OfTheWeekHeader setDifficultyLevel={this.setDifficultyLevel.bind(this)} type='Quickie'/>
        <FlatList
          data={wcMap['wc_'+currentWeekType+'.'+wcId]}
          renderItem={({item}) => this.renderRow(item)}
          extraData={qRefresh}
        />
        <OfTheWeekFooter setWeekType={this.setWeekType.bind(this)} type='Quickie' />
      </View>
    );
  }
}


export default WeeklyChallengeScreen;

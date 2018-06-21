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
import WeeklyChallengeLevels from '../dbstore/WeeklyChallengeLevels.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';
import WeeklyChallengeHeader from '../components/WeeklyChallengeHeader';
import WeeklyChallengeFooter from '../components/WeeklyChallengeFooter';


const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
})

const WclMap = {}
WeeklyChallengeLevels.map(element => {
  WclMap[element.wclId] = element;
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
        wcMap['wc_'+i+'.wcl000'+j] = [];
      }
    }

    this.sortOrder(WeeklyChallenge).map(element => {
      wcMap['wc_0.wcl0000'].push({key:element.wc_0, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_1.wcl0000'].push({key:element.wc_1, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_2.wcl0000'].push({key:element.wc_2, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_3.wcl0000'].push({key:element.wc_3, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_4.wcl0000'].push({key:element.wc_4, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_5.wcl0000'].push({key:element.wc_5, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_6.wcl0000'].push({key:element.wc_6, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_7.wcl0000'].push({key:element.wc_7, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_8.wcl0000'].push({key:element.wc_8, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_9.wcl0000'].push({key:element.wc_9, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_10.wcl0000'].push({key:element.wc_10, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_11.wcl0000'].push({key:element.wc_11, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_12.wcl0000'].push({key:element.wc_12, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_13.wcl0000'].push({key:element.wc_13, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_0.'+element.wclId].push({key:element.wc_0, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_1.'+element.wclId].push({key:element.wc_1, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_2.'+element.wclId].push({key:element.wc_2, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_3.'+element.wclId].push({key:element.wc_3, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_4.'+element.wclId].push({key:element.wc_4, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_5.'+element.wclId].push({key:element.wc_5, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_6.'+element.wclId].push({key:element.wc_6, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_7.'+element.wclId].push({key:element.wc_7, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_8.'+element.wclId].push({key:element.wc_8, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_9.'+element.wclId].push({key:element.wc_9, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_10.'+element.wclId].push({key:element.wc_10, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_11.'+element.wclId].push({key:element.wc_11, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_12.'+element.wclId].push({key:element.wc_12, wclId:element.wclId, wcMode:element.wcMode})
      wcMap['wc_13.'+element.wclId].push({key:element.wc_13, wclId:element.wclId, wcMode:element.wcMode})
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
      wclId: 'wcl0000',
      qRefresh: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let qMode = data.wcMode
    let quickie = QuickieMap[data.key]
    let difficultyName = WclMap[data.wclId].wclName.toUpperCase()

    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={OfTheDayRowStyle.container} 
        key={quickie.qId+'.'+data.wclId}
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

  setDifficultyLevel(wclId) {
    const update = {}
    update['wclId'] = wclId
    this.setState(update);
  }

  render() {
    const { wcMap, weekType, currentWeekType, previousWeekType, nextWeekType, wclId, qRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <WeeklyChallengeHeader setDifficultyLevel={this.setDifficultyLevel.bind(this)} />
        <FlatList
          data={wcMap['wc_'+weekType+'.'+wclId]}
          renderItem={({item}) => this.renderRow(item)}
          extraData={qRefresh}
        />
        <WeeklyChallengeFooter 
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

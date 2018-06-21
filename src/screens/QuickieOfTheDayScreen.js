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
import QuickieOfTheDay from '../dbstore/QuickieOfTheDay.json';
import OfTheDay from '../dbstore/OfTheDay.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';
import OfTheDayHeader from '../components/OfTheDayHeader';
import OfTheDayFooter from '../components/OfTheDayFooter';


const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
})

const OfTheDayMap = {}
OfTheDay.map(element => {
  OfTheDayMap[element.otdId] = element;
})

var currentWeekNumber = require('current-week-number');
var weekType = currentWeekNumber() % 2;


class QuickieOfTheDayScreen extends Component {
  
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'Quickie of the Day',
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
    let maxWeeks = 2;
    let maxDifficulty = 5;
    let qotdMap = {};
    for (i = 0; i < maxDays; i++) {
      for (j = 0; j < maxWeeks; j++) {
        for (k = 0; k <= maxDifficulty; k++) {
          qotdMap['qotd_'+i+'_'+j+'.otd000'+k] = [];
        }
      }
    }

    this.sortOrder(QuickieOfTheDay).map(element => {
      qotdMap['qotd_0_0.otd0000'].push({key:element.qotd_0_0, otdId:element.otdId})
      qotdMap['qotd_1_0.otd0000'].push({key:element.qotd_1_0, otdId:element.otdId})
      qotdMap['qotd_2_0.otd0000'].push({key:element.qotd_2_0, otdId:element.otdId})
      qotdMap['qotd_3_0.otd0000'].push({key:element.qotd_3_0, otdId:element.otdId})
      qotdMap['qotd_4_0.otd0000'].push({key:element.qotd_4_0, otdId:element.otdId})
      qotdMap['qotd_5_0.otd0000'].push({key:element.qotd_5_0, otdId:element.otdId})
      qotdMap['qotd_6_0.otd0000'].push({key:element.qotd_6_0, otdId:element.otdId})
      qotdMap['qotd_0_0.'+element.otdId].push({key:element.qotd_0_0, otdId:element.otdId})
      qotdMap['qotd_1_0.'+element.otdId].push({key:element.qotd_1_0, otdId:element.otdId})
      qotdMap['qotd_2_0.'+element.otdId].push({key:element.qotd_2_0, otdId:element.otdId})
      qotdMap['qotd_3_0.'+element.otdId].push({key:element.qotd_3_0, otdId:element.otdId})
      qotdMap['qotd_4_0.'+element.otdId].push({key:element.qotd_4_0, otdId:element.otdId})
      qotdMap['qotd_5_0.'+element.otdId].push({key:element.qotd_5_0, otdId:element.otdId})
      qotdMap['qotd_6_0.'+element.otdId].push({key:element.qotd_6_0, otdId:element.otdId})
      qotdMap['qotd_0_1.otd0000'].push({key:element.qotd_0_1, otdId:element.otdId})
      qotdMap['qotd_1_1.otd0000'].push({key:element.qotd_1_1, otdId:element.otdId})
      qotdMap['qotd_2_1.otd0000'].push({key:element.qotd_2_1, otdId:element.otdId})
      qotdMap['qotd_3_1.otd0000'].push({key:element.qotd_3_1, otdId:element.otdId})
      qotdMap['qotd_4_1.otd0000'].push({key:element.qotd_4_1, otdId:element.otdId})
      qotdMap['qotd_5_1.otd0000'].push({key:element.qotd_5_1, otdId:element.otdId})
      qotdMap['qotd_6_1.otd0000'].push({key:element.qotd_6_1, otdId:element.otdId})
      qotdMap['qotd_0_1.'+element.otdId].push({key:element.qotd_0_1, otdId:element.otdId})
      qotdMap['qotd_1_1.'+element.otdId].push({key:element.qotd_1_1, otdId:element.otdId})
      qotdMap['qotd_2_1.'+element.otdId].push({key:element.qotd_2_1, otdId:element.otdId})
      qotdMap['qotd_3_1.'+element.otdId].push({key:element.qotd_3_1, otdId:element.otdId})
      qotdMap['qotd_4_1.'+element.otdId].push({key:element.qotd_4_1, otdId:element.otdId})
      qotdMap['qotd_5_1.'+element.otdId].push({key:element.qotd_5_1, otdId:element.otdId})
      qotdMap['qotd_6_1.'+element.otdId].push({key:element.qotd_6_1, otdId:element.otdId})
    });

    this.state = {
      qotdMap: qotdMap,
      dayOfTheWeek: new Date().getDay(),
      otdId: 'otd0000',
      qRefresh: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let qMode = 'Standard'
    let quickie = QuickieMap[data.key]
    let difficultyName = OfTheDayMap[data.otdId].otdName.toUpperCase()
    
    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={OfTheDayRowStyle.container} 
        key={quickie.qId}
      >
        <Text style={OfTheDayRowStyle.qotdType}>{difficultyName}</Text>
        <View style={OfTheDayRowStyle.divider}/>
        <QuickieRow quickie={quickie} qMode={qMode} navigation={this.props.navigation} />
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
    const { qotdMap, dayOfTheWeek, otdId, qRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <OfTheDayHeader setDifficultyLevel={this.setDifficultyLevel.bind(this)} type='Quickie'/>
        <FlatList
          data={qotdMap['qotd_'+dayOfTheWeek+'_'+weekType+'.'+otdId]}
          renderItem={({item}) => this.renderRow(item)}
          extraData={qRefresh}
        />
        <OfTheDayFooter setDayOfTheWeek={this.setDayOfTheWeek.bind(this)} type='Quickie' />
      </View>
    );
  }
}


export default QuickieOfTheDayScreen;

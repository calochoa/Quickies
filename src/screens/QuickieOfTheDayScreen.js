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

    let qotdMap = {
      'qotd_0.otd0000':[], 'qotd_0.otd0001':[], 'qotd_0.otd0002':[], 'qotd_0.otd0003':[], 'qotd_0.otd0004':[], 'qotd_0.otd0005':[], 
      'qotd_1.otd0000':[], 'qotd_1.otd0001':[], 'qotd_1.otd0002':[], 'qotd_1.otd0003':[], 'qotd_1.otd0004':[], 'qotd_1.otd0005':[], 
      'qotd_2.otd0000':[], 'qotd_2.otd0001':[], 'qotd_2.otd0002':[], 'qotd_2.otd0003':[], 'qotd_2.otd0004':[], 'qotd_2.otd0005':[], 
      'qotd_3.otd0000':[], 'qotd_3.otd0001':[], 'qotd_3.otd0002':[], 'qotd_3.otd0003':[], 'qotd_3.otd0004':[], 'qotd_3.otd0005':[], 
      'qotd_4.otd0000':[], 'qotd_4.otd0001':[], 'qotd_4.otd0002':[], 'qotd_4.otd0003':[], 'qotd_4.otd0004':[], 'qotd_4.otd0005':[], 
      'qotd_5.otd0000':[], 'qotd_5.otd0001':[], 'qotd_5.otd0002':[], 'qotd_5.otd0003':[], 'qotd_5.otd0004':[], 'qotd_5.otd0005':[], 
      'qotd_6.otd0000':[], 'qotd_6.otd0001':[], 'qotd_6.otd0002':[], 'qotd_6.otd0003':[], 'qotd_6.otd0004':[], 'qotd_6.otd0005':[], 
    }

    this.sortOrder(QuickieOfTheDay).map(element => {
      qotdMap['qotd_0.otd0000'].push({key:element.qotd_0, otdId:element.otdId})
      qotdMap['qotd_1.otd0000'].push({key:element.qotd_1, otdId:element.otdId})
      qotdMap['qotd_2.otd0000'].push({key:element.qotd_2, otdId:element.otdId})
      qotdMap['qotd_3.otd0000'].push({key:element.qotd_3, otdId:element.otdId})
      qotdMap['qotd_4.otd0000'].push({key:element.qotd_4, otdId:element.otdId})
      qotdMap['qotd_5.otd0000'].push({key:element.qotd_5, otdId:element.otdId})
      qotdMap['qotd_6.otd0000'].push({key:element.qotd_6, otdId:element.otdId})
      qotdMap['qotd_0.'+element.otdId].push({key:element.qotd_0, otdId:element.otdId})
      qotdMap['qotd_1.'+element.otdId].push({key:element.qotd_1, otdId:element.otdId})
      qotdMap['qotd_2.'+element.otdId].push({key:element.qotd_2, otdId:element.otdId})
      qotdMap['qotd_3.'+element.otdId].push({key:element.qotd_3, otdId:element.otdId})
      qotdMap['qotd_4.'+element.otdId].push({key:element.qotd_4, otdId:element.otdId})
      qotdMap['qotd_5.'+element.otdId].push({key:element.qotd_5, otdId:element.otdId})
      qotdMap['qotd_6.'+element.otdId].push({key:element.qotd_6, otdId:element.otdId})
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
          data={qotdMap['qotd_'+dayOfTheWeek+'.'+otdId]}
          renderItem={({item}) => this.renderRow(item)}
          extraData={qRefresh}
        />
        <OfTheDayFooter setDayOfTheWeek={this.setDayOfTheWeek.bind(this)} type='Quickie' />
      </View>
    );
  }
}


export default QuickieOfTheDayScreen;

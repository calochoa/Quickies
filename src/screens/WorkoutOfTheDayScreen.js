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
import MenuIcon from '../components/MenuIcon';
import WorkoutRow from '../components/WorkoutRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';
import OfTheDayHeader from '../components/OfTheDayHeader';


const WorkoutMap = {}
Workouts.map(element => {
  WorkoutMap[element.wId] = element;
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

    let wotdMap = {
      'wotd_0.All':[], 'wotd_0.wotd0001':[], 'wotd_0.wotd0002':[], 'wotd_0.wotd0003':[], 'wotd_0.wotd0004':[], 'wotd_0.wotd0005':[], 
      'wotd_1.All':[], 'wotd_1.wotd0001':[], 'wotd_1.wotd0002':[], 'wotd_1.wotd0003':[], 'wotd_1.wotd0004':[], 'wotd_1.wotd0005':[], 
      'wotd_2.All':[], 'wotd_2.wotd0001':[], 'wotd_2.wotd0002':[], 'wotd_2.wotd0003':[], 'wotd_2.wotd0004':[], 'wotd_2.wotd0005':[], 
      'wotd_3.All':[], 'wotd_3.wotd0001':[], 'wotd_3.wotd0002':[], 'wotd_3.wotd0003':[], 'wotd_3.wotd0004':[], 'wotd_3.wotd0005':[], 
      'wotd_4.All':[], 'wotd_4.wotd0001':[], 'wotd_4.wotd0002':[], 'wotd_4.wotd0003':[], 'wotd_4.wotd0004':[], 'wotd_4.wotd0005':[], 
      'wotd_5.All':[], 'wotd_5.wotd0001':[], 'wotd_5.wotd0002':[], 'wotd_5.wotd0003':[], 'wotd_5.wotd0004':[], 'wotd_5.wotd0005':[], 
      'wotd_6.All':[], 'wotd_6.wotd0001':[], 'wotd_6.wotd0002':[], 'wotd_6.wotd0003':[], 'wotd_6.wotd0004':[], 'wotd_6.wotd0005':[], 
    }

    this.sortOrder(WorkoutOfTheDay).map(element => {
      wotdMap['wotd_0.All'].push({key:element.wotd_0, wotdName:element.wotdName})
      wotdMap['wotd_1.All'].push({key:element.wotd_1, wotdName:element.wotdName})
      wotdMap['wotd_2.All'].push({key:element.wotd_2, wotdName:element.wotdName})
      wotdMap['wotd_3.All'].push({key:element.wotd_3, wotdName:element.wotdName})
      wotdMap['wotd_4.All'].push({key:element.wotd_4, wotdName:element.wotdName})
      wotdMap['wotd_5.All'].push({key:element.wotd_5, wotdName:element.wotdName})
      wotdMap['wotd_6.All'].push({key:element.wotd_6, wotdName:element.wotdName})
      wotdMap['wotd_0.'+element.wotdId].push({key:element.wotd_0, wotdName:element.wotdName})
      wotdMap['wotd_1.'+element.wotdId].push({key:element.wotd_1, wotdName:element.wotdName})
      wotdMap['wotd_2.'+element.wotdId].push({key:element.wotd_2, wotdName:element.wotdName})
      wotdMap['wotd_3.'+element.wotdId].push({key:element.wotd_3, wotdName:element.wotdName})
      wotdMap['wotd_4.'+element.wotdId].push({key:element.wotd_4, wotdName:element.wotdName})
      wotdMap['wotd_5.'+element.wotdId].push({key:element.wotd_5, wotdName:element.wotdName})
      wotdMap['wotd_6.'+element.wotdId].push({key:element.wotd_6, wotdName:element.wotdName})
    });

    this.state = {
      wotdMap: wotdMap,
      dayOfTheWeek: new Date().getDay(),
      wRefresh: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let workout = WorkoutMap[data.key]
    
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={OfTheDayRowStyle.container} 
        key={workout.wId}
      >
        <Text style={OfTheDayRowStyle.wcType}>{data.wotdName.toUpperCase()}</Text>
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

  render() {
    const { wotdMap, dayOfTheWeek, wRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        {<OfTheDayHeader setDayOfTheWeek={this.setDayOfTheWeek.bind(this)} type='Workout' />}
        <FlatList
          data={wotdMap['wotd_'+dayOfTheWeek+'.All']}
          renderItem={({item}) => this.renderRow(item)}
          extraData={wRefresh}
        />
      </View>
    );
  }
}


export default WorkoutOfTheDayScreen;

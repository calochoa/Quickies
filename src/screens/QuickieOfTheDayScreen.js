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
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';
import OfTheDayHeader from '../components/OfTheDayHeader';


const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
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
      'qotd_0.All':[], 'qotd_0.qotd0001':[], 'qotd_0.qotd0002':[], 'qotd_0.qotd0003':[], 'qotd_0.qotd0004':[], 'qotd_0.qotd0005':[], 
      'qotd_1.All':[], 'qotd_1.qotd0001':[], 'qotd_1.qotd0002':[], 'qotd_1.qotd0003':[], 'qotd_1.qotd0004':[], 'qotd_1.qotd0005':[], 
      'qotd_2.All':[], 'qotd_2.qotd0001':[], 'qotd_2.qotd0002':[], 'qotd_2.qotd0003':[], 'qotd_2.qotd0004':[], 'qotd_2.qotd0005':[], 
      'qotd_3.All':[], 'qotd_3.qotd0001':[], 'qotd_3.qotd0002':[], 'qotd_3.qotd0003':[], 'qotd_3.qotd0004':[], 'qotd_3.qotd0005':[], 
      'qotd_4.All':[], 'qotd_4.qotd0001':[], 'qotd_4.qotd0002':[], 'qotd_4.qotd0003':[], 'qotd_4.qotd0004':[], 'qotd_4.qotd0005':[], 
      'qotd_5.All':[], 'qotd_5.qotd0001':[], 'qotd_5.qotd0002':[], 'qotd_5.qotd0003':[], 'qotd_5.qotd0004':[], 'qotd_5.qotd0005':[], 
      'qotd_6.All':[], 'qotd_6.qotd0001':[], 'qotd_6.qotd0002':[], 'qotd_6.qotd0003':[], 'qotd_6.qotd0004':[], 'qotd_6.qotd0005':[], 
    }

    this.sortOrder(QuickieOfTheDay).map(element => {
      qotdMap['qotd_0.All'].push({key:element.qotd_0, qotdName:element.qotdName})
      qotdMap['qotd_1.All'].push({key:element.qotd_1, qotdName:element.qotdName})
      qotdMap['qotd_2.All'].push({key:element.qotd_2, qotdName:element.qotdName})
      qotdMap['qotd_3.All'].push({key:element.qotd_3, qotdName:element.qotdName})
      qotdMap['qotd_4.All'].push({key:element.qotd_4, qotdName:element.qotdName})
      qotdMap['qotd_5.All'].push({key:element.qotd_5, qotdName:element.qotdName})
      qotdMap['qotd_6.All'].push({key:element.qotd_6, qotdName:element.qotdName})
      qotdMap['qotd_0.'+element.qotdId].push({key:element.qotd_0, qotdName:element.qotdName})
      qotdMap['qotd_1.'+element.qotdId].push({key:element.qotd_1, qotdName:element.qotdName})
      qotdMap['qotd_2.'+element.qotdId].push({key:element.qotd_2, qotdName:element.qotdName})
      qotdMap['qotd_3.'+element.qotdId].push({key:element.qotd_3, qotdName:element.qotdName})
      qotdMap['qotd_4.'+element.qotdId].push({key:element.qotd_4, qotdName:element.qotdName})
      qotdMap['qotd_5.'+element.qotdId].push({key:element.qotd_5, qotdName:element.qotdName})
      qotdMap['qotd_6.'+element.qotdId].push({key:element.qotd_6, qotdName:element.qotdName})
    });

    this.state = {
      qotdMap: qotdMap,
      dayOfTheWeek: new Date().getDay(),
      qRefresh: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let qMode = 'Standard'
    let quickie = QuickieMap[data.key]
    
    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={OfTheDayRowStyle.container} 
        key={quickie.qId}
      >
        <Text style={OfTheDayRowStyle.qotdType}>{data.qotdName.toUpperCase()}</Text>
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

  render() {
    const { qotdMap, dayOfTheWeek, qRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        {<OfTheDayHeader setDayOfTheWeek={this.setDayOfTheWeek.bind(this)} />}
        <FlatList
          data={qotdMap['qotd_'+dayOfTheWeek+'.All']}
          renderItem={({item}) => this.renderRow(item)}
          extraData={qRefresh}
        />
      </View>
    );
  }
}


export default QuickieOfTheDayScreen;

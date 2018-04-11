import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Quickies from '../dbstore/Quickies.json';
import WeeklyChallenge from '../dbstore/WeeklyChallenge.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';


const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
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

  constructor(props) {
    super(props);

    let wcTypes = WeeklyChallenge.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    var date = new Date();
    var dayOfTheWeek = date.getDay();

    let filteredData = []
    wcTypes.map(element => {
      filteredData.push({wcName: element.wcName, quickieId: element['wc_'+dayOfTheWeek]})
    })

    this.state = {
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let qMode = 'Bananas Mode'
    let quickie = QuickieMap[data.quickieId]
    
    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={OfTheDayRowStyle.container} 
        key={quickie.qId}
      >
        <Text style={OfTheDayRowStyle.wcType}>{data.wcName.toUpperCase()}</Text>
        <View style={OfTheDayRowStyle.divider}/>
        <QuickieRow quickie={quickie} qMode={qMode} navigation={this.props.navigation} />
      </LinearGradient>
    );
  }

  render() {
    const { filteredData } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          {filteredData.map((data) => this.renderRow(data))}
        </ScrollView>
      </View>
    );
  }
}


export default WeeklyChallengeScreen;

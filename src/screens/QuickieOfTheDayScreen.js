import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
} from 'react-native';
import Quickies from '../dbstore/Quickies.json';
import QuickieOfTheDayTypes from '../dbstore/QuickieOfTheDayTypes.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import OfTheDayRowStyle from '../style/OfTheDayRowStyle';


const QuickieOfTheDayTypesMap = new Map();
QuickieOfTheDayTypes.map(element => {
  QuickieOfTheDayTypesMap.set(element.qotdId, element.qotdName.toUpperCase());
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

  constructor(props) {
    super(props);

    var date = new Date();
    var dayOfTheWeek = date.getDay();

    let filteredData = []
    Quickies.map(element => {
      if (('qotdId' in element) && (dayOfTheWeek == element.qotdOrder)) {
        filteredData.push(element);
      }
    });
    filteredData = filteredData.sort((a,b) => {
        if (a.qotdId < b.qotdId) {
          return -1;
        }
        if (a.qotdId > b.qotdId) {
          return 1;
        }
        return 0;
      });

    this.state = {
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(quickie) {
    return (
      <View style={OfTheDayRowStyle.container} key={quickie.qId}>
        <Text style={OfTheDayRowStyle.qotdType}>{QuickieOfTheDayTypesMap.get(quickie.qotdId)}</Text>
        <View style={OfTheDayRowStyle.divider}/>
        <QuickieRow quickie={quickie} navigation={this.props.navigation} />
      </View>
    );
  }

  render() {
    const { filteredData } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          {filteredData.map((quickie) => this.renderRow(quickie))}
        </ScrollView>
      </View>
    );
  }
}


export default QuickieOfTheDayScreen;

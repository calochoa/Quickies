import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Quickies from '../dbstore/Quickies.json';
import QuickieTypes from '../dbstore/QuickieTypes.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieRowStyle from '../style/QuickieRowStyle';


const QuickieTypesMap = new Map();
QuickieTypes.map(element => {
  QuickieTypesMap.set(element.qtName, element.qtId);
})


class QuickiesScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let title = params ? params.quickieType + ' ' : ''
    title += (typeof params.qMode != 'undefined') ? params.qMode + ' ' : ''
    title += 'Quickies'

    title = title.startsWith('Level') ? title.replace('Level', 'Lvl') : title;

    return {
      title: title,
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };

  sortAlpha(filteredData) {
    return filteredData.sort((a,b) => {
      if (a.qName.toLowerCase() < b.qName.toLowerCase()) {
        return -1;
      }
      if (a.qName.toLowerCase() > b.qName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  sortDiffAlpha(filteredData) {
    return filteredData.sort((a,b) => {
      if (a.qDifficulty < b.qDifficulty) {
        return -1;
      }
      if (a.qDifficulty > b.qDifficulty) {
        return 1;
      }
      if (a.qName.toLowerCase() < b.qName.toLowerCase()) {
        return -1;
      }
      if (a.qName.toLowerCase() > b.qName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    let filteredData = []
    if (params.quickieType === 'All') {
      filteredData = this.sortAlpha(Quickies);
    } else if (params.quickieType.startsWith('Level')) {
      level = Number(params.quickieType.split(' ')[1])
      Quickies.map(element => {
        if (element.qDifficulty == level) {
          filteredData.push(element);
        }
      });
      filteredData = this.sortAlpha(filteredData);
    } else {
      if (params.qbs) {
        Quickies.map(element => {
          if (element.qbsId == params.qbs) {
            filteredData.push(element);
          }
        });
      } else {
        let quickieTypeId = QuickieTypesMap.get(params.quickieType)
        Quickies.map(element => {
          if (element.qtId === quickieTypeId) {
            filteredData.push(element);
          }
        });
      }
      filteredData = this.sortDiffAlpha(filteredData);
    }

    let qMode = (typeof params.qMode != 'undefined') ? params.qMode : 'Standard';

    this.state = {
      filteredData: filteredData,
      qMode: qMode,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(quickie, qMode) {
    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={QuickieRowStyle.container} 
        key={quickie.qId}
      >
        <QuickieRow quickie={quickie} qMode={qMode} navigation={this.props.navigation} key={quickie.qId} />
      </LinearGradient>
    );
  }

  render() {
    const { filteredData, qMode } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          {filteredData.map((quickie) => this.renderRow(quickie, qMode))}
        </ScrollView>
      </View>
    );
  }
}


export default QuickiesScreen;

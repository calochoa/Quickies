import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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

    return {
      title: params ? params.quickieType + ' Quickies' : 'Quickies',
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
    const { params } = this.props.navigation.state;

    let filteredData = []
    if (params.quickieType === 'All') {
      filteredData = Quickies.sort((a,b) => {
        if (a.qName.toLowerCase() < b.qName.toLowerCase()) {
          return -1;
        }
        if (a.qName.toLowerCase() > b.qName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else if (params.quickieType.startsWith('Level')) {
      level = Number(params.quickieType.split(' ')[1])
      Quickies.map(element => {
        if (element.qDifficulty == level) {
          filteredData.push(element);
        }
      });
      filteredData = filteredData.sort((a,b) => {
        if (a.qName.toLowerCase() < b.qName.toLowerCase()) {
          return -1;
        }
        if (a.qName.toLowerCase() > b.qName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      let quickieTypeId = QuickieTypesMap.get(params.quickieType)
      Quickies.map(element => {
        if (element.qtId === quickieTypeId) {
          filteredData.push(element);
        }
      });
      filteredData = filteredData.sort((a,b) => {
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

    this.state = {
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(quickie) {
    return (
      <LinearGradient 
        colors={['#4c669f', '#0276c9', '#192f6a']} 
        style={QuickieRowStyle.container} 
        key={quickie.qId}
      >
        <QuickieRow quickie={quickie} navigation={this.props.navigation} key={quickie.qId} />
      </LinearGradient>
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


export default QuickiesScreen;

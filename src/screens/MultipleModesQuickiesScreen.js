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


class MultipleModesQuickiesScreen extends Component {
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

  sortAlpha(filteredData) {

    return filteredData.sort((a,b) => {
      if (a.quickie.qName.toLowerCase() < b.quickie.qName.toLowerCase()) {
        return -1;
      }
      if (a.quickie.qName.toLowerCase() > b.quickie.qName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  getQModeDifficulty(qMode) {
    let qModeDifficulty = 1;
    if (typeof qMode != 'undefined') {
      if (qMode === 'Blah Mode') {
        qModeDifficulty = 0.5;
      } else if (qMode === 'Boss Mode') {
        qModeDifficulty = 2;
      } else if (qMode === 'Beast Mode') {
        qModeDifficulty = 4;
      } else if (qMode === 'Bananas Mode') {
        qModeDifficulty = 10;
      }
    }
    return qModeDifficulty;
  }

  sortReverseDiffAlpha(filteredData) {
    return filteredData.sort((a,b) => {
      aQModeDifficulty = this.getQModeDifficulty(a.qMode)
      bQModeDifficulty = this.getQModeDifficulty(b.qMode)
      if (aQModeDifficulty > bQModeDifficulty) {
        return -1;
      }
      if (aQModeDifficulty < bQModeDifficulty) {
        return 1;
      }
      if (a.quickie.qDifficulty > b.quickie.qDifficulty) {
        return -1;
      }
      if (a.quickie.qDifficulty < b.quickie.qDifficulty) {
        return 1;
      }
      if (a.quickie.qName.toLowerCase() < b.quickie.qName.toLowerCase()) {
        return -1;
      }
      if (a.quickie.qName.toLowerCase() > b.quickie.qName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    let filteredData = []
    if (params.quickieType === 'Favorite') {
      Quickies.map(element => {
        if (element.qFavorite) {
          filteredData.push({quickie: element, qMode: undefined});
        }
        if (element.qFavorite_BlahMode) {
          filteredData.push({quickie: element, qMode: 'Blah Mode'});
        }
        if (element.qFavorite_BossMode) {
          filteredData.push({quickie: element, qMode: 'Boss Mode'});
        }
        if (element.qFavorite_BeastMode) {
          filteredData.push({quickie: element, qMode: 'Beast Mode'});
        }
        if (element.qFavorite_BananasMode) {
          filteredData.push({quickie: element, qMode: 'Bananas Mode'});
        }
      });
      filteredData = this.sortAlpha(filteredData);
    } else if (params.quickieType === 'Completed') {
      Quickies.map(element => {
        if (element.qCompleted) {
          filteredData.push({quickie: element, qMode: undefined});
        }
        if (element.qCompleted_BlahMode) {
          filteredData.push({quickie: element, qMode: 'Blah Mode'});
        }
        if (element.qCompleted_BossMode) {
          filteredData.push({quickie: element, qMode: 'Boss Mode'});
        }
        if (element.qCompleted_BeastMode) {
          filteredData.push({quickie: element, qMode: 'Beast Mode'});
        }
        if (element.qCompleted_BananasMode) {
          filteredData.push({quickie: element, qMode: 'Bananas Mode'});
        }
      });
      filteredData = this.sortReverseDiffAlpha(filteredData);
    }

    this.state = {
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(data) {
    let quickie = data.quickie
    let qMode = data.qMode
    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={QuickieRowStyle.container} 
        key={quickie.qId + ' ' + qMode}
      >
        <QuickieRow quickie={quickie} qMode={qMode} navigation={this.props.navigation} key={quickie.qId} />
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


export default MultipleModesQuickiesScreen;

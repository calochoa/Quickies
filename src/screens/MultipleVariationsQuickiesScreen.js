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


class MultipleVariationsQuickiesScreen extends Component {
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

  getQVariationDifficulty(qVariation) {
    let qVariationDifficulty = 1;
    if (typeof qVariation != 'undefined') {
      if (qVariation === 'Blah Mode') {
        qVariationDifficulty = 0.5;
      } else if (qVariation === 'Boss Mode') {
        qVariationDifficulty = 2;
      } else if (qVariation === 'Beast Mode') {
        qVariationDifficulty = 4;
      } else if (qVariation === 'Bananas Mode') {
        qVariationDifficulty = 10;
      }
    }
    return qVariationDifficulty;
  }

  sortReverseDiffAlpha(filteredData) {
    return filteredData.sort((a,b) => {
      aQVariationDifficulty = this.getQVariationDifficulty(a.qVariation)
      bQVariationDifficulty = this.getQVariationDifficulty(b.qVariation)
      if (aQVariationDifficulty > bQVariationDifficulty) {
        return -1;
      }
      if (aQVariationDifficulty < bQVariationDifficulty) {
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
          filteredData.push({quickie: element, qVariation: undefined});
        }
        if (element.qFavorite_BlahMode) {
          filteredData.push({quickie: element, qVariation: 'Blah Mode'});
        }
        if (element.qFavorite_BossMode) {
          filteredData.push({quickie: element, qVariation: 'Boss Mode'});
        }
        if (element.qFavorite_BeastMode) {
          filteredData.push({quickie: element, qVariation: 'Beast Mode'});
        }
        if (element.qFavorite_BananasMode) {
          filteredData.push({quickie: element, qVariation: 'Bananas Mode'});
        }
      });
      filteredData = this.sortAlpha(filteredData);
    } else if (params.quickieType === 'Completed') {
      Quickies.map(element => {
        if (element.qCompleted) {
          filteredData.push({quickie: element, qVariation: undefined});
        }
        if (element.qCompleted_BlahMode) {
          filteredData.push({quickie: element, qVariation: 'Blah Mode'});
        }
        if (element.qCompleted_BossMode) {
          filteredData.push({quickie: element, qVariation: 'Boss Mode'});
        }
        if (element.qCompleted_BeastMode) {
          filteredData.push({quickie: element, qVariation: 'Beast Mode'});
        }
        if (element.qCompleted_BananasMode) {
          filteredData.push({quickie: element, qVariation: 'Bananas Mode'});
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
    let qVariation = data.qVariation
    return (
      <LinearGradient 
        colors={getGradientColor(qVariation)} 
        style={QuickieRowStyle.container} 
        key={quickie.qId + ' ' + qVariation}
      >
        <QuickieRow quickie={quickie} qVariation={qVariation} navigation={this.props.navigation} key={quickie.qId} />
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


export default MultipleVariationsQuickiesScreen;

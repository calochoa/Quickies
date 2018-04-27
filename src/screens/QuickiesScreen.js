import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Quickies from '../dbstore/Quickies.json';
import QuickieTypes from '../dbstore/QuickieTypes.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import QuickiesHeader from '../components/QuickiesHeader';
import QuickiesFooter from '../components/QuickiesFooter';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieRowStyle from '../style/QuickieRowStyle';
import { quickieLookupHeaderMap } from '../misc/QuickieLookupHeader';


const QuickieTypesMap = new Map();
QuickieTypes.map(element => {
  QuickieTypesMap.set(element.qtName, element.qtId);
})


class QuickiesScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let title = navigation.state.params.title;
    if (typeof(navigation.state.params)==='undefined' 
      || typeof(navigation.state.params.title) === 'undefined') {
      title = quickieLookupHeaderMap.get(params.qLookup)
    }

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

    let qCompleteMap = {
      'qbs0000.All':[], 'qbs0001.All':[], 'qbs0002.All':[], 'qbs0003.All':[], 'qbs0004.All':[],
      'qbs0000.0':[], 'qbs0001.0':[], 'qbs0002.0':[], 'qbs0003.0':[], 'qbs0004.0':[],
      'qbs0000.1':[], 'qbs0001.1':[], 'qbs0002.1':[], 'qbs0003.1':[], 'qbs0004.1':[],
      'qbs0000.2':[], 'qbs0001.2':[], 'qbs0002.2':[], 'qbs0003.2':[], 'qbs0004.2':[],
      'qbs0000.3':[], 'qbs0001.3':[], 'qbs0002.3':[], 'qbs0003.3':[], 'qbs0004.3':[],
      'qbs0000.4':[], 'qbs0001.4':[], 'qbs0002.4':[], 'qbs0003.4':[], 'qbs0004.4':[],
      'qbs0000.5':[], 'qbs0001.5':[], 'qbs0002.5':[], 'qbs0003.5':[], 'qbs0004.5':[],
      'qbs0000.6':[], 'qbs0001.6':[], 'qbs0002.6':[], 'qbs0003.6':[], 'qbs0004.6':[],
    }

    this.sortDiffAlpha(Quickies).map(element => {
      // compile all body split quickies
      qCompleteMap['qbs0000.All'].push({key:element.qId, quickie:element});
      qCompleteMap[element.qbsId+'.All'].push({key:element.qId, quickie:element})
      // compile all level quickies
      qCompleteMap['qbs0000.'+element.qDifficulty].push({key:element.qId, quickie:element})
      qCompleteMap[element.qbsId+'.'+element.qDifficulty].push({key:element.qId, quickie:element})
    });

    let qMode = (typeof params.qMode != 'undefined') ? params.qMode : 'Standard';

    this.state = {
      qLookup: params.qLookup,
      qCompleteMap: qCompleteMap,
      qMode: qMode,
      quickieType: params.quickieType,
      qbs: params.qbs,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(quickie) {
    qMode=this.state.qMode
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

  setQLookup(qLookupVal) {
    const update = {}
    update['qLookup'] = qLookupVal
    this.setState(update);

    this.props.navigation.setParams({ title: quickieLookupHeaderMap.get(qLookupVal) })
  }

  render() {
    const { qLookup, qCompleteMap, qMode, quickieType, qbs } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        {/*<QuickiesHeader navigation={this.props.navigation} quickieType={quickieType} qbs={qbs}/>*/}
        <FlatList
          data={qCompleteMap[qLookup]}
          renderItem={({item}) => this.renderRow(item.quickie)}
        />
        <QuickiesFooter setQLookup={this.setQLookup.bind(this)} navigation={this.props.navigation} quickieType={quickieType} qbs={qbs}/>
      </View>
    );
  }
}


export default QuickiesScreen;

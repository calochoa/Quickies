import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import BodySplits from '../dbstore/BodySplits.json';
import Quickies from '../dbstore/Quickies.json';
import MenuIcon from '../components/MenuIcon';
import QuickieRow from '../components/QuickieRow';
import QuickiesHeader from '../components/QuickiesHeader';
import QuickiesModeHeader from '../components/QuickiesModeHeader';
import BodySplitsFooter from '../components/BodySplitsFooter';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieRowStyle from '../style/QuickieRowStyle';
import { quickieLookupHeaderMap } from '../misc/QuickieLookupHeader';


let numBodySplits = 0;
BodySplits.map(element => { numBodySplits++; })


class QuickiesScreen extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let qLookup = params.bodySplit + '.' + params.qLevel
    let title = navigation.state.params.title;
    if (typeof(navigation.state.params)==='undefined' 
      || typeof(navigation.state.params.title) === 'undefined') {
      title = quickieLookupHeaderMap.get(qLookup)
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

    let maxDifficulty = 6;
    let qCompleteMap = {};
    for (i = 0; i < numBodySplits; i++) {
      for (j = -1; j <= maxDifficulty; j++) {
        let difficulty = (j == -1 ? 'All' : j);
        qCompleteMap['bs000'+i+'.'+difficulty] = [];
      }
    }

    this.sortDiffAlpha(Quickies).map(element => {
      // compile all body split quickies
      qCompleteMap['bs0000.All'].push({key:element.qId, quickie:element});
      qCompleteMap[element.bsId+'.All'].push({key:element.qId, quickie:element})
      // compile all level quickies
      qCompleteMap['bs0000.'+element.qDifficulty].push({key:element.qId, quickie:element})
      qCompleteMap[element.bsId+'.'+element.qDifficulty].push({key:element.qId, quickie:element})
    });

    let qMode = (typeof params.qMode != 'undefined') ? params.qMode : 'Standard';
    let qLookup = params.bodySplit + '.' + params.qLevel

    this.state = {
      qLookup: qLookup,
      qCompleteMap: qCompleteMap,
      bodySplit: params.bodySplit,
      qLevel: params.qLevel,
      qMode: qMode,
      bs: params.bs,
      qModeVisible: false,
      qRefresh: false,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(quickie) {
    return (
      <LinearGradient 
        colors={getGradientColor('Standard')} 
        style={QuickieRowStyle.container} 
        key={quickie.qId+'.'+this.state.qRefresh}
      >
        <QuickieRow quickie={quickie} qMode={this.state.qMode} navigation={this.props.navigation} key={quickie.qId} />
      </LinearGradient>
    );
  }

  setBodySplit(bodySplit) {
    const update = {}
    update['bodySplit'] = bodySplit
    this.setState(update);
    
    let qLookupVal = bodySplit + '.' + this.state.qLevel
    const update2 = {}
    update2['qLookup'] = qLookupVal
    this.setState(update2);

    this.setHeaderTitle(qLookupVal)
  }

  setQLevel(qLevel) {
    const update = {}
    update['qLevel'] = qLevel
    this.setState(update);

    let qLookupVal = this.state.bodySplit + '.' + qLevel
    const update2 = {}
    update2['qLookup'] = qLookupVal
    this.setState(update2);

    this.setHeaderTitle(qLookupVal)
  }

  setQMode(qMode) {
    const update = {}
    update['qMode'] = qMode
    this.setState(update);

    let qRefresh = !this.state.qRefresh
    const update2 = {}
    update2['qRefresh'] = qRefresh
    this.setState(update2);
  }

  setHeaderTitle(qLookupVal) {
    this.props.navigation.setParams({ title: quickieLookupHeaderMap.get(qLookupVal) })
  }

  showQMode(visible) {
    const update = {}
    update['qModeVisible'] = visible
    this.setState(update);
  }

  render() {
    const { qLookup, qCompleteMap, qMode, qModeVisible, qRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <QuickiesHeader setQLevel={this.setQLevel.bind(this)} showQMode={this.showQMode.bind(this)} />
        {qModeVisible ? <QuickiesModeHeader setQMode={this.setQMode.bind(this)} qMode={qMode} /> : null}
        <FlatList
          data={qCompleteMap[qLookup]}
          renderItem={({item}) => this.renderRow(item.quickie)}
          extraData={qRefresh}
        />
        <BodySplitsFooter setBodySplit={this.setBodySplit.bind(this)} />
      </View>
    );
  }
}


export default QuickiesScreen;

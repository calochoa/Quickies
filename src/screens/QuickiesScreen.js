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
import QuickiesModeHeader from '../components/QuickiesModeHeader';
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

    let qLookup = params.qBodySplit + '.' + params.qLevel
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

    let qCompleteMap = {
      'qbs0000.All.Standard':[], 'qbs0001.All.Standard':[], 'qbs0002.All.Standard':[], 'qbs0003.All.Standard':[], 'qbs0004.All.Standard':[],
      'qbs0000.0.Standard':[], 'qbs0001.0.Standard':[], 'qbs0002.0.Standard':[], 'qbs0003.0.Standard':[], 'qbs0004.0.Standard':[],
      'qbs0000.1.Standard':[], 'qbs0001.1.Standard':[], 'qbs0002.1.Standard':[], 'qbs0003.1.Standard':[], 'qbs0004.1.Standard':[],
      'qbs0000.2.Standard':[], 'qbs0001.2.Standard':[], 'qbs0002.2.Standard':[], 'qbs0003.2.Standard':[], 'qbs0004.2.Standard':[],
      'qbs0000.3.Standard':[], 'qbs0001.3.Standard':[], 'qbs0002.3.Standard':[], 'qbs0003.3.Standard':[], 'qbs0004.3.Standard':[],
      'qbs0000.4.Standard':[], 'qbs0001.4.Standard':[], 'qbs0002.4.Standard':[], 'qbs0003.4.Standard':[], 'qbs0004.4.Standard':[],
      'qbs0000.5.Standard':[], 'qbs0001.5.Standard':[], 'qbs0002.5.Standard':[], 'qbs0003.5.Standard':[], 'qbs0004.5.Standard':[],
      'qbs0000.6.Standard':[], 'qbs0001.6.Standard':[], 'qbs0002.6.Standard':[], 'qbs0003.6.Standard':[], 'qbs0004.6.Standard':[],
    }

    this.sortDiffAlpha(Quickies).map(element => {
      // compile all body split quickies
      qCompleteMap['qbs0000.All.Standard'].push({key:element.qId, quickie:element});
      qCompleteMap[element.qbsId+'.All.Standard'].push({key:element.qId, quickie:element})
      // compile all level quickies
      qCompleteMap['qbs0000.'+element.qDifficulty+'.Standard'].push({key:element.qId, quickie:element})
      qCompleteMap[element.qbsId+'.'+element.qDifficulty+'.Standard'].push({key:element.qId, quickie:element})
    });

    let qMode = (typeof params.qMode != 'undefined') ? params.qMode : 'Standard';
    let qLookup = params.qBodySplit + '.' + params.qLevel + '.' +  qMode

    this.state = {
      qLookup: qLookup,
      qCompleteMap: qCompleteMap,
      qBodySplit: params.qBodySplit,
      qLevel: params.qLevel,
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

  setQBodySplit(qBodySplit) {
    const update = {}
    update['qBodySplit'] = qBodySplit
    this.setState(update);
    
    let qLookupVal = qBodySplit + '.' + this.state.qLevel + '.' + this.state.qMode
    const update2 = {}
    update2['qLookup'] = qLookupVal
    this.setState(update2);

    this.setHeaderTitle(qLookupVal)
  }

  setQLevel(qLevel) {
    const update = {}
    update['qLevel'] = qLevel
    this.setState(update);

    let qLookupVal = this.state.qBodySplit + '.' + qLevel + '.' + this.state.qMode
    const update2 = {}
    update2['qLookup'] = qLookupVal
    this.setState(update2);

    this.setHeaderTitle(qLookupVal)
  }

  setQMode(qMode) {
    const update = {}
    update['qMode'] = qMode
    this.setState(update);

    let qLookupVal = this.state.qBodySplit + '.' + this.state.qLevel + '.' + qMode
    const update2 = {}
    update2['qLookup'] = qLookupVal
    this.setState(update2);

    this.setHeaderTitle(qLookupVal)
  }

  setHeaderTitle(qLookupVal) {
    this.props.navigation.setParams({ title: quickieLookupHeaderMap.get(qLookupVal) })
  }

  render() {
    const { qLookup, qCompleteMap, qBodySplit, qLevel, qMode, quickieType, qbs } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        {<QuickiesHeader setQLevel={this.setQLevel.bind(this)}/>}
        {/*<QuickiesModeHeader setQMode={this.setQMode.bind(this)}/>*/}
        <FlatList
          data={qCompleteMap[qLookup]}
          renderItem={({item}) => this.renderRow(item.quickie)}
          keyboardShouldPersistTaps={'always'}
        />
        <QuickiesFooter setQBodySplit={this.setQBodySplit.bind(this)}/>
      </View>
    );
  }
}


export default QuickiesScreen;

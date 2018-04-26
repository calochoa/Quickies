import React, { Component } from 'react';
import {
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickieModes from '../dbstore/QuickieModes.json';
import QuickieBodySplits from '../dbstore/QuickieBodySplits.json';
import QuickiesFooterStyle from '../style/QuickiesFooterStyle';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';
import { bodySplitImagePathMap } from '../misc/BodySplitImagePaths';


const QuickieModesMap = {};
QuickieModes.map(element => {
  QuickieModesMap[element.qvName] = element;
})


class QuickiesFooter extends Component {
  constructor(props) {
    super(props);

    let qModes = []
    QuickieModes.map(element => {
      qModes.push(element.qvName);
    });

    let qBodySplits = QuickieBodySplits.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    let sectionTitles = []
    qBodySplits.map(element => {
      sectionTitles.push(element.qbsName);
    });

    this.state = {
      qModes: qModes,
      qBodySplits: qBodySplits,
      quickieType: this.props.quickieType,
      qbs: this.props.qbs,
    };
  }

  renderQuickieMode(qMode, quickieType, qbs) {
    return (
      <TouchableOpacity 
        style={QuickiesFooterStyle.qModeContainer}
        key={qMode}
        onPress={() => {
          this.props.navigation.navigate('Quickies', {quickieType: quickieType, qbs: qbs, qMode: qMode});
        }}
      >
        <Image source={difficultyImagePathMap.get(qMode)} />
        <Text style={QuickiesFooterStyle.footerText}>{qMode.replace(' Mode','')}</Text>
      </TouchableOpacity>
    );
  }

  renderQuickieBodySplit(qMode, qBodySplit) {
    return (
      <TouchableOpacity 
        style={QuickiesFooterStyle.qModeContainer}
        key={qBodySplit.qbsId}
        onPress={() => {
          this.props.navigation.navigate('Quickies', {quickieType: qBodySplit.qbsName, qbs: qBodySplit.qbsId, qMode: qMode});
        }}
      >
        <Image source={bodySplitImagePathMap.get(qBodySplit.qbsName)} />
        <Text style={QuickiesFooterStyle.footerText}>{qBodySplit.qbsName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { qModes, qBodySplits, quickieType, qbs } = this.state;

    return (
      <LinearGradient colors={getGradientColor('Standard')} style={QuickiesFooterStyle.container}>
        {/*qModes.map((qMode) => this.renderQuickieMode(qMode, quickieType, qbs))*/}
        {qBodySplits.map((qBodySplit) => this.renderQuickieBodySplit(qMode, qBodySplit))}
      </LinearGradient>
    );
  }
}


export default QuickiesFooter;

import React, { Component } from 'react';
import {
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickieBodySplits from '../dbstore/QuickieBodySplits.json';
import QuickiesFooterStyle from '../style/QuickiesFooterStyle';
import { bodySplitImagePathMap } from '../misc/BodySplitImagePaths';


class QuickiesFooter extends Component {
  constructor(props) {
    super(props);

    let qBodySplits = QuickieBodySplits.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    this.state = {
      qBodySplits: qBodySplits,
      setQBodySplit: this.props.setQBodySplit,
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

  renderQuickieBodySplit(qBodySplit) {
    return (
      <TouchableOpacity 
        style={QuickiesFooterStyle.qModeContainer}
        key={qBodySplit.qbsId}
        onPress={() => {this.state.setQBodySplit(qBodySplit.qbsId)}}
      >
        <Image source={bodySplitImagePathMap.get(qBodySplit.qbsName)} />
        <Text style={QuickiesFooterStyle.footerText}>{qBodySplit.qbsName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { qBodySplits } = this.state;

    return (
      <LinearGradient colors={getGradientColor('Standard')} style={QuickiesFooterStyle.container}>
        {qBodySplits.map((qBodySplit) => this.renderQuickieBodySplit(qBodySplit))}
      </LinearGradient>
    );
  }
}


export default QuickiesFooter;

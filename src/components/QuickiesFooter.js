import React, { Component } from 'react';
import {
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
      qbs0000: true,
      qbs0001: false,
      qbs0002: false,
      qbs0003: false,
      qbs0004: false,
      qBodySplits: qBodySplits,
      setQBodySplit: this.props.setQBodySplit,
    };
  }

  setHighlighted(qName) {
    const update = {}
    update['qbs0000'] = false
    update['qbs0001'] = false
    update['qbs0002'] = false
    update['qbs0003'] = false
    update['qbs0004'] = false
    update[qName] = true
    this.setState(update);
  }

  renderQuickieBodySplit(qBodySplit) {
    let qbsId = qBodySplit.qbsId
    let imageSrc = this.state[qbsId] ? bodySplitImagePathMap.get(qBodySplit.qbsName + ' Selected') 
      : bodySplitImagePathMap.get(qBodySplit.qbsName);
    let qBodySplitStyle = this.state[qbsId] ? QuickiesFooterStyle.selectedBodySplitText 
      : QuickiesFooterStyle.bodySplitText;

    return (
      <TouchableOpacity 
        style={QuickiesFooterStyle.qBodySplitContainer}
        key={qbsId}
        onPress={() => { this.state.setQBodySplit(qbsId); this.setHighlighted(qbsId); }}
      >
        <Image source={imageSrc}/>
        <Text style={qBodySplitStyle}>{qBodySplit.qbsName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { qBodySplits } = this.state;

    return (
      <LinearGradient colors={getGradientColor('Footer')} style={QuickiesFooterStyle.container}>
        {qBodySplits.map((qBodySplit) => this.renderQuickieBodySplit(qBodySplit))}
      </LinearGradient>
    );
  }
}


export default QuickiesFooter;

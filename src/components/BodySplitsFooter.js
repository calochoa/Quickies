import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import BodySplits from '../dbstore/BodySplits.json';
import BodySplitsFooterStyle from '../style/BodySplitsFooterStyle';
import { bodySplitImagePathMap } from '../misc/BodySplitImagePaths';


class BodySplitsFooter extends Component {
  constructor(props) {
    super(props);

    let bodySplits = BodySplits.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    this.state = {
      bs0000: true,
      bs0001: false,
      bs0002: false,
      bs0003: false,
      bs0004: false,
      bodySplits: bodySplits,
      setBodySplit: this.props.setBodySplit,
    };
  }

  setHighlighted(bsId) {
    const update = {}
    update['bs0000'] = false
    update['bs0001'] = false
    update['bs0002'] = false
    update['bs0003'] = false
    update['bs0004'] = false
    update[bsId] = true
    this.setState(update);
  }

  renderBodySplit(bodySplit) {
    let bsId = bodySplit.bsId
    let imageSrc = this.state[bsId] ? bodySplitImagePathMap.get(bodySplit.bsName + ' Selected') 
      : bodySplitImagePathMap.get(bodySplit.bsName);
    let bodySplitStyle = this.state[bsId] ? BodySplitsFooterStyle.selectedBodySplitText 
      : BodySplitsFooterStyle.bodySplitText;

    return (
      <TouchableOpacity 
        style={BodySplitsFooterStyle.bodySplitContainer}
        key={bsId}
        onPress={() => { this.state.setBodySplit(bsId); this.setHighlighted(bsId); }}
      >
        <Image source={imageSrc}/>
        <Text style={bodySplitStyle}>{bodySplit.bsName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { bodySplits } = this.state;

    return (
      <LinearGradient colors={getGradientColor('BodySplitsFooter')} style={BodySplitsFooterStyle.container}>
        {bodySplits.map((bodySplit) => this.renderBodySplit(bodySplit))}
      </LinearGradient>
    );
  }
}


export default BodySplitsFooter;

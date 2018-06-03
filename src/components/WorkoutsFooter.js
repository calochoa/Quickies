import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import WorkoutBodySplits from '../dbstore/WorkoutBodySplits.json';
import WorkoutsFooterStyle from '../style/WorkoutsFooterStyle';
import { bodySplitImagePathMap } from '../misc/BodySplitImagePaths';


class WorkoutsFooter extends Component {
  constructor(props) {
    super(props);

    let wBodySplits = WorkoutBodySplits.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    this.state = {
      wbs0000: true,
      wbs0001: false,
      wbs0002: false,
      wbs0003: false,
      wbs0004: false,
      wBodySplits: wBodySplits,
      setWBodySplit: this.props.setWBodySplit,
    };
  }

  setHighlighted(wName) {
    const update = {}
    update['wbs0000'] = false
    update['wbs0001'] = false
    update['wbs0002'] = false
    update['wbs0003'] = false
    update['wbs0004'] = false
    update[wName] = true
    this.setState(update);
  }

  renderWorkoutBodySplit(wBodySplit) {
    let wbsId = wBodySplit.wbsId
    let imageSrc = this.state[wbsId] ? bodySplitImagePathMap.get(wBodySplit.wbsName + ' Selected') 
      : bodySplitImagePathMap.get(wBodySplit.wbsName);
    let wBodySplitStyle = this.state[wbsId] ? WorkoutsFooterStyle.selectedBodySplitText 
      : WorkoutsFooterStyle.bodySplitText;

    return (
      <TouchableOpacity 
        style={WorkoutsFooterStyle.wBodySplitContainer}
        key={wbsId}
        onPress={() => { this.state.setWBodySplit(wbsId); this.setHighlighted(wbsId); }}
      >
        <Image source={imageSrc}/>
        <Text style={wBodySplitStyle}>{wBodySplit.wbsName}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { wBodySplits } = this.state;

    return (
      <LinearGradient colors={getGradientColor('WorkoutsFooter')} style={WorkoutsFooterStyle.container}>
        {wBodySplits.map((wBodySplit) => this.renderWorkoutBodySplit(wBodySplit))}
      </LinearGradient>
    );
  }
}


export default WorkoutsFooter;

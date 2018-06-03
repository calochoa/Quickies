import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  View, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import WorkoutsHeaderStyle from '../style/WorkoutsHeaderStyle';
import InfoIconSmall from '../components/InfoIconSmall';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import WorkoutLevels from '../dbstore/WorkoutLevels.json';


class WorkoutsHeader extends Component {

  sortOrder(data) {
    return data.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
  }

  constructor(props) {
    super(props);

    let wLevelInfo = []
    this.sortOrder(WorkoutLevels).map(element => {
      wLevelInfo.push(element.wlName + ' - ' + element.wlDescription);
    });

    this.state = {
      All: true,
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      setWLevel: this.props.setWLevel,
      wLevelInfo: wLevelInfo,
    };
  }

  setModalVisible(wlId, visible) {
    const update = {}
    update[wlId] = visible
    this.setState(update);
  }

  renderOverlay(wlId) {
    return (
      <Overlay 
        visible={this.state[wlId]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(wlId, false);}}
      >
        <Text style={OverlayStyle.header}>Workout Levels</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{this.state.wLevelInfo.join('\n\n')}</Text>
      </Overlay>
    )
  }

  setHighlighted(wLevel) {
    const update = {}
    update['All'] = false
    update['1'] = false
    update['2'] = false
    update['3'] = false
    update['4'] = false
    update['5'] = false
    update[wLevel] = true
    this.setState(update);
  }

  renderWorkoutLevel(wLevel) {
    let wLevelStyle = this.state[wLevel] ? 
      WorkoutsHeaderStyle.selectedLevelText : WorkoutsHeaderStyle.levelText;

    return (
      <TouchableOpacity 
        style={WorkoutsHeaderStyle.levelContainer}
        key={wLevel}
        onPress={() => { this.state.setWLevel(wLevel); this.setHighlighted(wLevel); }}
      >
        <Text style={wLevelStyle}>{wLevel}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <LinearGradient colors={getGradientColor('WorkoutsHeader')} style={WorkoutsHeaderStyle.container}>
        {this.renderOverlay('levelInfo')}
        <TouchableOpacity 
          style={WorkoutsHeaderStyle.levelInfoContainer}
          onPress={() => {this.setModalVisible('levelInfo', true);}}
        >
          <InfoIconSmall />
          <Text style={WorkoutsHeaderStyle.levelText}> Levels:</Text>
        </TouchableOpacity>
        {this.renderWorkoutLevel('All')}
        {this.renderWorkoutLevel('1')}
        {this.renderWorkoutLevel('2')}
        {this.renderWorkoutLevel('3')}
        {this.renderWorkoutLevel('4')}
        {this.renderWorkoutLevel('5')}
      </LinearGradient>
    );
  }
}


export default WorkoutsHeader;

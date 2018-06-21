import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import WeeklyChallengeHeaderStyle from '../style/WeeklyChallengeHeaderStyle';
import InfoIconSmall from '../components/InfoIconSmall';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import WeeklyChallengeLevels from '../dbstore/WeeklyChallengeLevels.json';


class WeeklyChallengeHeader extends Component {

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

    let weeklyChallengeLevelInfo = []
    let weeklyChallengeLevels = []
    this.sortOrder(WeeklyChallengeLevels).map(element => {
      if (element.order > 0) {
        weeklyChallengeLevelInfo.push(element.wclName.toUpperCase() + ' - ' + element.wclDescription);  
      }
      weeklyChallengeLevels.push(element);
    });

    this.state = {
      wcl0000: true,
      wcl0001: false,
      wcl0002: false,
      wcl0003: false,
      wcl0004: false,
      wcl0005: false,
      weeklyChallengeLevels: weeklyChallengeLevels,
      setDifficultyLevel: this.props.setDifficultyLevel,
      weeklyChallengeLevelInfo: weeklyChallengeLevelInfo,
    };
  }

  setHighlighted(wclId) {
    const update = {}
    update['wcl0000'] = false
    update['wcl0001'] = false
    update['wcl0002'] = false
    update['wcl0003'] = false
    update['wcl0004'] = false
    update['wcl0005'] = false
    update[wclId] = true
    this.setState(update);
  }

  setModalVisible(id, visible) {
    const update = {}
    update[id] = visible
    this.setState(update);
  }

  renderOverlay(id) {
    return (
      <Overlay 
        visible={this.state[id]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(id, false);}}
      >
        <Text style={OverlayStyle.header}>Weekly Challenge Levels</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{this.state.weeklyChallengeLevelInfo.join('\n\n')}</Text>
      </Overlay>
    )
  }

  renderWeeklyChallengeLevel(weeklyChallengeLevel) {
    let wclId = weeklyChallengeLevel.wclId
    let weeklyChallengeStyle = this.state[wclId] ? WeeklyChallengeHeaderStyle.selectedLevelText 
      : WeeklyChallengeHeaderStyle.levelText;

    return (
      <TouchableOpacity 
        style={WeeklyChallengeHeaderStyle.levelContainer}
        key={wclId}
        onPress={() => { this.state.setDifficultyLevel(wclId); this.setHighlighted(wclId); }}
      >
        <Text style={weeklyChallengeStyle}>{weeklyChallengeLevel.wclAbbr}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { weeklyChallengeLevels } = this.state;

    return (
      <LinearGradient colors={getGradientColor('WeekHeader')} style={WeeklyChallengeHeaderStyle.container}>
        {this.renderOverlay('levelInfo')}
        <TouchableOpacity 
          style={WeeklyChallengeHeaderStyle.levelInfoContainer}
          onPress={() => {this.setModalVisible('levelInfo', true);}}
        >
          <InfoIconSmall />
          <Text style={WeeklyChallengeHeaderStyle.levelText}> Levels:</Text>
        </TouchableOpacity>
        {weeklyChallengeLevels.map((weeklyChallengeLevel) => this.renderWeeklyChallengeLevel(weeklyChallengeLevel))}
      </LinearGradient>
    );
  }
}


export default WeeklyChallengeHeader;

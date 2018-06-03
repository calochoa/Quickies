import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import OfTheDay from '../dbstore/OfTheDay.json';
import OfTheDayHeaderStyle from '../style/OfTheDayHeaderStyle';
import InfoIconSmall from '../components/InfoIconSmall';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import OfTheDayLevels from '../dbstore/OfTheDayLevels.json';


class OfTheDayHeader extends Component {

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

    let otdLevelInfo = []
    this.sortOrder(OfTheDayLevels).map(element => {
      let description = element.otdLevelDescription
      if (this.props.type == 'Workout') {
        description = description.replace('quickies', 'workouts')
      } 
      otdLevelInfo.push(element.otdLevelName.toUpperCase() + ' - ' + description);
    });


    let ofTheDayLevels = OfTheDay.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    this.state = {
      otd0000: true,
      otd0001: false,
      otd0002: false,
      otd0003: false,
      otd0004: false,
      otd0005: false,
      ofTheDayLevels: ofTheDayLevels,
      setDifficultyLevel: this.props.setDifficultyLevel,
      otdLevelInfo: otdLevelInfo,
      type: this.props.type,
    };
  }

  setHighlighted(otdId) {
    const update = {}
    update['otd0000'] = false
    update['otd0001'] = false
    update['otd0002'] = false
    update['otd0003'] = false
    update['otd0004'] = false
    update['otd0005'] = false
    update[otdId] = true
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
        <Text style={OverlayStyle.header}>{this.state.type} Levels</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{this.state.otdLevelInfo.join('\n\n')}</Text>
      </Overlay>
    )
  }

  renderOfTheDayLevel(ofTheDayLevel) {
    let otdId = ofTheDayLevel.otdId
    let ofTheDayStyle = this.state[otdId] ? OfTheDayHeaderStyle.selectedLevelText 
      : OfTheDayHeaderStyle.levelText;

    return (
      <TouchableOpacity 
        style={OfTheDayHeaderStyle.levelContainer}
        key={otdId}
        onPress={() => { this.state.setDifficultyLevel(otdId); this.setHighlighted(otdId); }}
      >
        <Text style={ofTheDayStyle}>{ofTheDayLevel.otdAbbr.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { ofTheDayLevels } = this.state;

    return (
      <LinearGradient colors={getGradientColor('OfTheDayHeader')} style={OfTheDayHeaderStyle.container}>
        {this.renderOverlay('levelInfo')}
        <TouchableOpacity 
          style={OfTheDayHeaderStyle.levelInfoContainer}
          onPress={() => {this.setModalVisible('levelInfo', true);}}
        >
          <InfoIconSmall />
          <Text style={OfTheDayHeaderStyle.levelText}> Levels:</Text>
        </TouchableOpacity>
        {ofTheDayLevels.map((ofTheDayLevel) => this.renderOfTheDayLevel(ofTheDayLevel))}
      </LinearGradient>
    );
  }
}


export default OfTheDayHeader;

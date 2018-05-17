import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import OfTheDay from '../dbstore/OfTheDay.json';
import OfTheDayFooterStyle from '../style/OfTheDayFooterStyle';
import { bodySplitImagePathMap } from '../misc/BodySplitImagePaths';


class OfTheDayFooter extends Component {
  constructor(props) {
    super(props);

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

  renderQuickieBodySplit(ofTheDayLevel) {
    let otdId = ofTheDayLevel.otdId
    let ofTheDayStyle = this.state[otdId] ? OfTheDayFooterStyle.selectedDifficultyText 
      : OfTheDayFooterStyle.difficultyText;

    return (
      <TouchableOpacity 
        style={OfTheDayFooterStyle.difficultyContainer}
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
      <LinearGradient colors={getGradientColor('OfTheDayFooter')} style={OfTheDayFooterStyle.container}>
        {ofTheDayLevels.map((ofTheDayLevel) => this.renderQuickieBodySplit(ofTheDayLevel))}
      </LinearGradient>
    );
  }
}


export default OfTheDayFooter;

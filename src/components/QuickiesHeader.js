import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  Image, 
  View, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickiesHeaderStyle from '../style/QuickiesHeaderStyle';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';


class QuickiesHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      All: true,
      '0': false,
      '1': false,
      '2': false,
      '3': false,
      '4': false,
      '5': false,
      '6': false,
      setQLevel: this.props.setQLevel,
    };
  }

  setHighlighted(qLevel) {
    const update = {}
    update['All'] = false
    update['0'] = false
    update['1'] = false
    update['2'] = false
    update['3'] = false
    update['4'] = false
    update['5'] = false
    update['6'] = false
    update[qLevel] = true
    this.setState(update);
  }

  renderQuickieLevel(qLevel) {
    let qLevelStyle = this.state[qLevel] ? 
      QuickiesHeaderStyle.selectedLevelText : QuickiesHeaderStyle.levelText;
      
    return (
      <TouchableOpacity 
        style={QuickiesHeaderStyle.levelContainer}
        key={qLevel}
        onPress={() => { this.state.setQLevel(qLevel); this.setHighlighted(qLevel); }}
      >
        <Text style={qLevelStyle}>{qLevel}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <LinearGradient colors={getGradientColor('Footer')} style={QuickiesHeaderStyle.container}>
        <View style={QuickiesHeaderStyle.levelContainer}>
          <Text style={QuickiesHeaderStyle.levelText}>Levels:</Text>
        </View>
        {this.renderQuickieLevel('All')}
        {this.renderQuickieLevel('0')}
        {this.renderQuickieLevel('1')}
        {this.renderQuickieLevel('2')}
        {this.renderQuickieLevel('3')}
        {this.renderQuickieLevel('4')}
        {this.renderQuickieLevel('5')}
        {this.renderQuickieLevel('6')}
      </LinearGradient>
    );
  }
}


export default QuickiesHeader;

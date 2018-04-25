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
import QuickiesFooterStyle from '../style/QuickiesFooterStyle';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';


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

    this.state = {
      qModes: qModes,
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

  render() {
    const { qModes, quickieType, qbs } = this.state;

    return (
      <LinearGradient colors={getGradientColor('Standard')} style={QuickiesFooterStyle.container}>
        {qModes.map((qMode) => this.renderQuickieMode(qMode, quickieType, qbs))}
      </LinearGradient>
    );
  }
}


export default QuickiesFooter;

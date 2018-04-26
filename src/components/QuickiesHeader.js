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


class QuickiesHeader extends Component {
  constructor(props) {
    super(props);

    let qModes = ['Level']
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
        <Text style={QuickiesFooterStyle.footerText}>{qMode.replace(' Mode','')}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { qModes, quickieType, qbs } = this.state;

    return (
      <LinearGradient colors={getGradientColor('Standard')} style={styles.container}>
        {/*qModes.map((qMode) => this.renderQuickieMode(qMode, quickieType, qbs))*/}
        <Text style={styles.headerText}>Levels:   All   0   1   2   3   4   5   6</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center', 
  },
  headerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Gill Sans',
  },
});

export default QuickiesHeader;

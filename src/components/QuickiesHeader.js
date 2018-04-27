import React, { Component } from 'react';
import {
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Image, 
  View, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickiesFooterStyle from '../style/QuickiesFooterStyle';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';


class QuickiesHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setQLevel: this.props.setQLevel,
    };
  }

  renderQuickieBodySplit(qLevel) {
    return (
      <TouchableOpacity 
        style={styles.levelContainer}
        key={qLevel}
        onPress={() => {this.state.setQLevel(qLevel)}}
      >
        <Text style={styles.levelText}>{qLevel}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <LinearGradient colors={getGradientColor('Standard')} style={styles.container}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Levels:</Text>
        </View>
        {this.renderQuickieBodySplit('All')}
        {this.renderQuickieBodySplit('0')}
        {this.renderQuickieBodySplit('1')}
        {this.renderQuickieBodySplit('2')}
        {this.renderQuickieBodySplit('3')}
        {this.renderQuickieBodySplit('4')}
        {this.renderQuickieBodySplit('5')}
        {this.renderQuickieBodySplit('6')}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'center', 
  },
  levelText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gill Sans',
    paddingLeft: 7,
    paddingRight: 7,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Gill Sans',
  },
});

export default QuickiesHeader;

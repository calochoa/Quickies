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
import InfoIconSmall from '../components/InfoIconSmall';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import QuickieLevels from '../dbstore/QuickieLevels.json';


class QuickiesHeader extends Component {

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

    let qLevelInfo = []
    this.sortOrder(QuickieLevels).map(element => {
      if (element.qlId.startsWith('Standard')) {
        qLevelInfo.push(element.qlName + ' - ' + element.qlDescription);
      }
    });

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
      qLevelInfo: qLevelInfo
    };
  }

  setModalVisible(qlId, visible) {
    const update = {}
    update[qlId] = visible
    this.setState(update);
  }

  renderOverlay(qlId, qMode) {
    return (
      <Overlay 
        visible={this.state[qlId]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(qlId, false);}}
      >
        <Text style={OverlayStyle.header}>{qMode} Quickie Levels</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{this.state.qLevelInfo.join('\n\n')}</Text>
      </Overlay>
    )
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
        {this.renderOverlay('levelInfo', 'Standard')}
        <TouchableOpacity 
          style={QuickiesHeaderStyle.levelContainer}
          onPress={() => {this.setModalVisible('levelInfo', true);}}
        >
          <InfoIconSmall />
          <Text style={QuickiesHeaderStyle.levelText}>  Levels:</Text>
        </TouchableOpacity>
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

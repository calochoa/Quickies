import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  Image, 
  View, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickiesHeaderModeStyle from '../style/QuickiesHeaderModeStyle';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';
import InfoIconSmall from '../components/InfoIconSmall';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import QuickieModes from '../dbstore/QuickieModes.json';


class QuickiesModeHeader extends Component {

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

    let qModeInfo = []
    let qModes = this.sortOrder(QuickieModes)
    qModes.map(element => {
      qModeInfo.push(element.qvName + ' - ' + element.qvDescription);
    });

    let qMode = this.props.qMode

    this.state = {
      qv0000: qMode==='Standard',
      qv0001: qMode==='Blah Mode',
      qv0002: qMode==='Boss Mode',
      qv0003: qMode==='Beast Mode',
      qv0004: qMode==='Bananas Mode',
      qModes: qModes,
      setQMode: this.props.setQMode,
      qModeInfo: qModeInfo,
    };
  }

  setModalVisible(qmId, visible) {
    const update = {}
    update[qmId] = visible
    this.setState(update);
  }

  renderOverlay(qmId) {
    return (
      <Overlay 
        visible={this.state[qmId]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(qmId, false);}}
      >
        <Text style={OverlayStyle.header}>Quickie Modes</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{this.state.qModeInfo.join('\n\n')}</Text>
      </Overlay>
    )
  }

  setHighlighted(qvId) {
    const update = {}
    update['qv0000'] = false
    update['qv0001'] = false
    update['qv0002'] = false
    update['qv0003'] = false
    update['qv0004'] = false
    update[qvId] = true
    this.setState(update);
  }

  renderQuickieMode(qMode) {
    let qvId = qMode.qvId
    let imageSrc = this.state[qvId] ? difficultyImagePathMap.get(qMode.qvName + ' Selected') 
      : difficultyImagePathMap.get(qMode.qvName + ' Unselected');
    let qModeStyle = this.state[qvId] ? QuickiesHeaderModeStyle.selectedModeText 
      : QuickiesHeaderModeStyle.modeText;

    return (
      <TouchableOpacity 
        style={QuickiesHeaderModeStyle.qModeContainer}
        key={qvId}
        onPress={() => { this.state.setQMode(qMode.qvName); this.setHighlighted(qvId); }}
      >
        <Image source={imageSrc}/>
        <Text style={qModeStyle}>{qMode.qvName.replace(' Mode','')}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { qModes } = this.state;

    return (
      <LinearGradient colors={getGradientColor('QuickiesHeader')} style={QuickiesHeaderModeStyle.container}>
        {this.renderOverlay('modeInfo')}
        {qModes.map((qMode) => this.renderQuickieMode(qMode))}
        <TouchableOpacity 
          style={QuickiesHeaderModeStyle.qModeContainer}
          onPress={() => {this.setModalVisible('modeInfo', true);}}
        >
          <Text style={QuickiesHeaderModeStyle.modeInfoText}>Modes</Text>
          <InfoIconSmall />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}


export default QuickiesModeHeader;

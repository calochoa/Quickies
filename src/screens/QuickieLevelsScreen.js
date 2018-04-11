import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickieLevels from '../dbstore/QuickieLevels.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';


const qlDescriptionMap = new Map();
QuickieLevels.map(element => {
  qlDescriptionMap.set(element.qlId, element.qlDescription);
})


class QuickieLevelsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Quickie Levels',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Quickies by Level',
    };
  };

  constructor(props) {
    super(props);

    let quickieLevels = QuickieLevels.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    let qlData = []
    quickieLevels.map(element => {
      qlData.push({sectionTitle: element.qlName, qlId: element.qlId});
    });

    this.state = {
      qlData: qlData,
    };
  }

  setModalVisible(qlId, visible) {
    const update = {}
    update[qlId] = visible
    this.setState(update);
  }

  renderOverlay(qlId, sectionTitle, qMode) {
    return (
      <Overlay 
        visible={this.state[qlId]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(qlId, false);}}
      >
        <Text style={OverlayStyle.header}>{qMode}{'\n'}{sectionTitle} Quickies</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{qlDescriptionMap.get(qlId)}</Text>
      </Overlay>
    )
  }

  renderMainRow(data) {
    let sectionTitle = data.sectionTitle
    let qlId = data.qlId
    let qMode = qlId.slice(0, -2)

    return (
      <LinearGradient 
        colors={getGradientColor(qMode)} 
        style={[MainRowStyle.container, MainRowStyle.extra10Margin]} 
        key={qlId}
      >
        {this.renderOverlay(qlId, sectionTitle, qMode)}
        <TouchableOpacity 
          style={MainRowStyle.infoLevelContainer} 
          onPress={() => {this.setModalVisible(qlId, true);}}
        >
          <InfoIcon />
        </TouchableOpacity>
        <View style={MainRowStyle.titleContainer}>
          <Text style={MainRowStyle.title}>
            <View style={{marginRight: 10}}>
              <Image source={difficultyImagePathMap.get(qMode)} />
            </View>
            {sectionTitle}
          </Text>
        </View>
        <TouchableOpacity 
          style={MainRowStyle.nextLevelContainer} 
          onPress={() => {
            this.props.navigation.navigate('Quickies', {quickieType: sectionTitle, qMode: qMode});
          }}
        >
          <ForwardIcon />
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  render() {
    const { qlData } = this.state;

    return (
      <View style={MainContainerStyle.containerNoSpaceAround}>
        <ScrollView>
          {qlData.map((data) => this.renderMainRow(data))}
        </ScrollView>
      </View>
    );
  }
}


export default QuickieLevelsScreen;

import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
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


const qlDescriptionMap = new Map();
QuickieLevels.map(element => {
  qlDescriptionMap.set(element.qlName, element.qlDescription);
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

    let sectionTitles = []
    quickieLevels.map(element => {
      sectionTitles.push(element.qlName);
    });

    this.state = {
      sectionTitles: sectionTitles,
    };
  }

  setModalVisible(sectionTitle, visible) {
    const update = {}
    update[sectionTitle] = visible
    this.setState(update);
  }

  renderOverlay(sectionTitle) {
    return (
      <Overlay 
        visible={this.state[sectionTitle]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(sectionTitle, false);}}
      >
        <Text style={OverlayStyle.header}>{sectionTitle} Quickies</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{qlDescriptionMap.get(sectionTitle)}</Text>
      </Overlay>
    )
  }

  renderMainRow(sectionTitle) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={MainRowStyle.container} 
        key={sectionTitle}
      >
        {this.renderOverlay(sectionTitle)}
        <TouchableOpacity 
          style={MainRowStyle.infoLevelContainer} 
          onPress={() => {this.setModalVisible(sectionTitle, true);}}
        >
          <InfoIcon />
        </TouchableOpacity>
        <View style={MainRowStyle.titleContainer}>
          <Text style={MainRowStyle.title}>{sectionTitle}</Text>
        </View>
        <TouchableOpacity 
          style={MainRowStyle.nextLevelContainer} 
          onPress={() => {
            this.props.navigation.navigate('Quickies', {
              quickieType: sectionTitle,
            });
          }}
        >
          <ForwardIcon />
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  render() {
    const { sectionTitles } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        {sectionTitles.map((sectionTitle) => this.renderMainRow(sectionTitle))}
      </View>
    );
  }
}


export default QuickieLevelsScreen;

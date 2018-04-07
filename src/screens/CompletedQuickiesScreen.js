import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  Modal,
  TouchableHighlight,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuickieTypes from '../dbstore/QuickieTypes.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';


const qtDescriptionMap = new Map();
QuickieTypes.map(element => {
  qtDescriptionMap.set(element.qtName, element.qtDescription);
})


class CompletedQuickiesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Completed Quickies',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Completed Quickies',
    };
  };

  constructor(props) {
    super(props);

    let quickieTypes = QuickieTypes.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    let sectionTitles = []
    quickieTypes.map(element => {
      sectionTitles.push(element.qtName);
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
        <Text style={OverlayStyle.text}>{qtDescriptionMap.get(sectionTitle)}</Text>
      </Overlay>
    )
  }

  renderMainRow(sectionTitle) {
    return (
      <LinearGradient 
        colors={['#4c669f', '#0276c9', '#192f6a']} 
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


export default CompletedQuickiesScreen;

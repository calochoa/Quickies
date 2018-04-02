import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  Modal,
  TouchableHighlight,
} from 'react-native';
import QuickieTypes from '../dbstore/QuickieTypes.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';


class QuickieTypesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Quickie Types',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Quickies',
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
    modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderMainRow(sectionTitle) {
    return (
      <View style={MainRowStyle.container} key={sectionTitle}>
        <TouchableOpacity 
          style={MainRowStyle.infoLevelContainer} 
          onPress={() => {this.setModalVisible(true);}}
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
      </View>
    );
  }

  render() {
    const { sectionTitles } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <Overlay 
          visible={this.state.modalVisible}
          closeOnTouchOutside={true}
          containerStyle={OverlayStyle.container}
          childrenWrapperStyle={OverlayStyle.wrapper}
          onClose={() => {this.setModalVisible(false);}}
        >
          <Text style={OverlayStyle.header}>Junior Quickies</Text>
          <View style={OverlayStyle.divider}/>
          <Text>Try these beginner level quickies if you are just starting to work out.</Text>
        </Overlay>
        {sectionTitles.map((sectionTitle) => this.renderMainRow(sectionTitle))}
      </View>
    );
  }
}


export default QuickieTypesScreen;

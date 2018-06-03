import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import WorkoutTypes from '../dbstore/WorkoutTypes.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';


const wtDescriptionMap = new Map();
WorkoutTypes.map(element => {
  wtDescriptionMap.set(element.wtName, element.wtDescription);
})


class WorkoutTypesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Workouts Types',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Workouts',
    };
  };

  constructor(props) {
    super(props);

    let workoutTypes = WorkoutTypes.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    let sectionTitles = []
    workoutTypes.map(element => {
      sectionTitles.push(element.wtName);
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
        <Text style={OverlayStyle.header}>{sectionTitle} Workouts</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{wtDescriptionMap.get(sectionTitle)}</Text>
      </Overlay>
    )
  }

  renderRow(sectionTitle) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={[MainRowStyle.container, MainRowStyle.extra15Margin]} 
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
            this.props.navigation.navigate('Workouts', {
              workoutType: sectionTitle,
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
      <View style={MainContainerStyle.containerNoSpaceAround}>
        {sectionTitles.map((sectionTitle) => this.renderRow(sectionTitle))}
      </View>
    );
  }
}


export default WorkoutTypesScreen;

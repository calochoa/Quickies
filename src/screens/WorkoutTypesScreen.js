import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
} from 'react-native';
import WorkoutTypes from '../dbstore/WorkoutTypes.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';


class WorkoutTypesView extends Component {
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

  renderRow(sectionTitle) {
    return (
      <View style={[MainRowStyle.container, MainRowStyle.extra15Margin]} key={sectionTitle}>
        <TouchableOpacity 
          style={MainRowStyle.infoLevelContainer}
          onPress={() => {
            this.props.navigation.navigate('Workouts', {
              workoutType: sectionTitle,
            });
          }}
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
      </View>
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


export default WorkoutTypesView;

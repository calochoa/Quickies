import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
} from 'react-native';
import ExerciseTypes from '../dbstore/ExerciseTypes.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';


class ExerciseTypesScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Exercise Types',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Exercises',
    };
  };

  constructor(props) {
    super(props);

    let exerciseTypes = ExerciseTypes.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    let sectionTitles = []
    exerciseTypes.map(element => {
      sectionTitles.push(element.etName);
    });

    this.state = {
      sectionTitles: sectionTitles,
    };
  }

  renderRow(sectionTitle) {
    return (
      <View style={MainRowStyle.container} key={sectionTitle}>
        <TouchableOpacity 
          style={MainRowStyle.infoLevelContainer} 
          onPress={() => {
            this.props.navigation.navigate('Exercises', {
              exerciseType: sectionTitle,
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
            this.props.navigation.navigate('Exercises', {
              exerciseType: sectionTitle,
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
        {sectionTitles.map((sectionTitle) => this.renderRow(sectionTitle))}
      </View>
    );
  }
}


export default ExerciseTypesScreen;

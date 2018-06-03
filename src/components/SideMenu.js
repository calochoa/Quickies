import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import SideMenuStyle from '../style/SideMenuStyle';


class SideMenu extends Component {
  
  navigateToScreen = (route) => () => {
    if (route === 'Quickies') {
      this.props.navigation.navigate('Quickies', {qBodySplit: 'qbs0000', qLevel: 'All'});
    } else if (route === 'FavoriteQuickies') {
      this.props.navigation.navigate('MultipleModesQuickies', {quickieType: 'Favorite'});
    } else if (route === 'CompletedQuickies') {
      this.props.navigation.navigate('MultipleModesQuickies', {quickieType: 'Completed'});
    } else if (route === 'Workouts') {
      this.props.navigation.navigate('Workouts', {wBodySplit: 'wbs0000', wLevel: 'All'});
    } else {
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
    }
  }

  render () {
    return (
      <View style={SideMenuStyle.container}>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('Home')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('Quickies')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Quickies</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('QuickieOfTheDay')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Quickie of the Day</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('WorkoutOfTheDay')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Workout of the Day</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('WeeklyChallenge')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Weekly Challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('Workouts')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('Exercises')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('FavoriteQuickies')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Favorite Quickies</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('CompletedQuickies')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Completed Quickies</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('FAQ')}
        >
          <Text style={SideMenuStyle.navItemStyle}>Frequently Asked Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={SideMenuStyle.navSectionStyle} 
          onPress={this.navigateToScreen('MyProfile')}
        >
          <Text style={SideMenuStyle.navItemStyle}>My Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


SideMenu.propTypes = {
  navigation: PropTypes.object
};


export default SideMenu;

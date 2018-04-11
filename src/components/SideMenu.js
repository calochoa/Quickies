import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { NavigationActions } from 'react-navigation';



class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('Home')}>
          <Text style={styles.navItemStyle}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('QuickieOptions')}>
          <Text style={styles.navItemStyle}>
            Quickies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('QuickieOfTheDay')}>
          <Text style={styles.navItemStyle}>
            Quickie of the Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('WorkoutOfTheDay')}>
          <Text style={styles.navItemStyle}>
            Workout of the Day
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('WeeklyChallenge')}>
          <Text style={styles.navItemStyle}>
            Weekly Challenge
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('WorkoutTypes')}>
          <Text style={styles.navItemStyle}>
            Workouts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('ExerciseTypes')}>
          <Text style={styles.navItemStyle}>
            Exercises
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('FAQ')}>
          <Text style={styles.navItemStyle}>
            Frequently Asked Questions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navSectionStyle} onPress={this.navigateToScreen('MyProfile')}>
          <Text style={styles.navItemStyle}>
            My Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  navItemStyle: {
    padding: 10,
    fontSize: 16,    
    fontFamily: 'Gill Sans',
  },
  navSectionStyle: {
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};


export default SideMenu;

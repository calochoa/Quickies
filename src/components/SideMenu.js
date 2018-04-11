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
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
            Home
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('QuickieOptions')}>
            Quickies
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('QuickieOfTheDay')}>
            Quickie of the Day
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('WorkoutOfTheDay')}>
            Workout of the Day
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('WeeklyChallenge')}>
            Weekly Challenge
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('WorkoutTypes')}>
            Workouts
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ExerciseTypes')}>
            Exercises
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('FAQ')}>
            Frequently Asked Questions
          </Text>
        </View>
        <View style={styles.navSectionStyle}>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('MyProfile')}>
            My Profile
          </Text>
        </View>
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
    backgroundColor: 'white',
    //backgroundColor: 'lightgrey',
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

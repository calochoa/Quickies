import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator,
} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Home from './Home';
import QuickiesView from './QuickiesView';
import QuickiesTemplate from './QuickiesTemplate';
import QuickieTemplate from './QuickieTemplate';
import WorkoutTypesView from './WorkoutTypesView';
import WorkoutsView from './WorkoutsView';
import WorkoutsTemplate from './WorkoutsTemplate';
import ExercisesView from './ExercisesView';
import ExercisesTemplate from './ExercisesTemplate';
import ExerciseTemplate from './ExerciseTemplate';
import QuickieOfTheDay from './QuickieOfTheDay';
import WorkoutOfTheDay from './WorkoutOfTheDay';
import ChallengeOfTheWeek from './ChallengeOfTheWeek';
import FAQ from './Faq';

class HomeNavigation extends Component {

  renderScene(route, navigator) {
    switch (route.id) {
      case 'Home':
        return (<Home navigator={navigator} />);
      case 'Quickies':
        return (<QuickiesView navigator={navigator} headerTitle={route.id} />);
      case 'QuickiesTemplate':
        return (<QuickiesTemplate navigator={navigator} headerTitle={route.name} />);
      case 'QuickieTemplate':
        return (<QuickieTemplate navigator={navigator} qId={route.qId} />);
      case 'Workouts':
        return (<WorkoutTypesView navigator={navigator} headerTitle={route.id} />);
      case 'WorkoutsView':
        return (<WorkoutsView navigator={navigator} headerTitle={route.name} />);
      case 'WorkoutsTemplate':
        return (<WorkoutsTemplate navigator={navigator} headerTitle={route.name} wId={route.wId} />);
      case 'Exercises':
        return (<ExercisesView navigator={navigator} headerTitle={route.id} />);
      case 'ExercisesTemplate':
        return (<ExercisesTemplate navigator={navigator} headerTitle={route.name} />);
      case 'ExerciseTemplate':
        return (<ExerciseTemplate navigator={navigator} eId={route.eId} />);
      case 'Quickie of the Day':
        return (<QuickieOfTheDay navigator={navigator} headerTitle={route.id} />);
      case 'Workout of the Day':
        return (<WorkoutOfTheDay navigator={navigator} headerTitle={route.id} />);
      case 'Weekly Challenge':
        return (<ChallengeOfTheWeek navigator={navigator} headerTitle={route.id} />);
      case 'FAQ':
        return (<FAQ navigator={navigator} headerTitle={route.id} />);
      default:
        return (<Home navigator={navigator} />);
    }
  }

  render() {
    return (
      <NavigationExperimental.Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => FloatFromRight}
        initialRoute={{id: 'Home'}}
        renderScene={this.renderScene} />
    );
  }
}

const SCREEN_WIDTH = require('Dimensions').get('window').width;

/**
 * Overwrite the default navigator scene config.
 * to use a wider area for back swiping.
 */
const FloatFromRight = {
  ...NavigationExperimental.Navigator.SceneConfigs.FloatFromRight,
  gestures: {
    pop: {
      ...NavigationExperimental.Navigator.SceneConfigs.FloatFromRight.gestures.pop,
      edgeHitWidth: SCREEN_WIDTH / 4,
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeNavigation;

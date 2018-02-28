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
import WorkoutsView from './WorkoutsView';
import WorkoutsTemplate from './WorkoutsTemplate';
import ExercisesView from './ExercisesView';
import ExercisesTemplate from './ExercisesTemplate';
import ExerciseTemplate from './ExerciseTemplate';
import VideosView from './VideosView';
import VideosTemplate from './VideosTemplate';
import Video from './Video'

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
        return (<WorkoutsView navigator={navigator} headerTitle={route.id} />);
      case 'WorkoutsTemplate':
        return (<WorkoutsTemplate navigator={navigator} headerTitle={route.name} />);
      case 'Exercises':
        return (<ExercisesView navigator={navigator} headerTitle={route.id} />);
      case 'ExercisesTemplate':
        return (<ExercisesTemplate navigator={navigator} headerTitle={route.name} />);
      case 'ExerciseTemplate':
        return (<ExerciseTemplate navigator={navigator} eId={route.eId} />);
      case 'Videos':
        return (<VideosView navigator={navigator} headerTitle={route.id} />);
      case 'VideosTemplate':
        return (<VideosTemplate navigator={navigator} headerTitle={route.name} />);
      case 'Video':
        return (<Video navigator={navigator} ytId={route.ytId} />);
      case 'Stopwatch':
        return (<Stopwatch />);
      default:
        return (<Home navigator={navigator} />);
    }
  }

  render() {
    return (
      <NavigationExperimental.Navigator
        ref="navigator"
        style={styles.container}
        configureScene={(route) => NavigationExperimental.Navigator.SceneConfigs.FloatFromBottom}
        initialRoute={{id: 'Home'}}
        renderScene={this.renderScene} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeNavigation;

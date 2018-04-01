import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Workouts from './dbstore/Workouts.json';
import Quickies from './dbstore/Quickies.json';
import WorkoutTypes from './dbstore/WorkoutTypes.json';

const { object } = PropTypes;
const QuickiesMap = new Map();
Quickies.map(element => {
  QuickiesMap.set(element.qId, element.qName);
});
const WorkoutTypesMap = new Map();
WorkoutTypes.map(element => {
  WorkoutTypesMap.set(element.wtName, element.wtId);
})

class WorkoutsView extends Component {
  constructor(props) {
    super(props);

    let filteredData = []
    let workoutTypeId = WorkoutTypesMap.get(this.props.headerTitle)
    Workouts.map(element => {
      if (element.wtId === workoutTypeId) {
        filteredData.push(element);
      }
    });

    this.state = {
      filteredData : filteredData,
      headerTitle: this.props.headerTitle + ' Workouts (' + filteredData.length + ')',
    };
  }

  static propTypes = {
    navigator: object,
  }

  _getLeftQuickies(quickies) {
    let leftQuickies = [];
    for (let i=0; i < quickies.length / 2; i++) {
      leftQuickies.push(<Text style={styles.quickies} key={i}>{i+1}. {QuickiesMap.get(quickies[i])}</Text>);
    }
    return leftQuickies;
  }

  _getRightQuickies(quickies) {
    let rightQuickies = [];
    for (let i=quickies.length / 2; i < quickies.length; i++) {
      rightQuickies.push(<Text style={styles.quickies} key={i}>{i+1}. {QuickiesMap.get(quickies[i])}</Text>);
    }
    return rightQuickies;
  }

  _getInfo(quickies) {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.quickiesContainer}>
          {this._getLeftQuickies(quickies)}
        </View>
        <View style={styles.quickiesContainer}>
          {this._getRightQuickies(quickies)}
        </View>
      </View>
    );
  }

  _onSelectSection(workout) {
    this.props.navigator.push({
      id: 'WorkoutsTemplate',
      name: workout.wName,
      wId: workout.wId,
    });
  }

  _renderRow(workout) {
    return (
      <View style={styles.button} key={workout.wId}>
        <Text style={styles.title}>{workout.wName}</Text>
        <View style={styles.row}>
          <TouchableOpacity 
            style={styles.nextLevelContainer}
            onPress={() => this._onSelectSection(workout)}
          >
            <Image source={require('./images/icons8-info-26.png')} />
          </TouchableOpacity>
          {this._getInfo(workout.qIds)}
          <TouchableOpacity 
            style={styles.nextLevelContainer}
            onPress={() => this._onSelectSection(workout)}
          >
            <Image source={require('./images/icons8-forward-25-white.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { navigator } = this.props;
    const { headerTitle, filteredData } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} navigator={navigator} />
        <View style={styles.innerContainer}>
          <ScrollView>
            {filteredData.map((workout) => this._renderRow(workout))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#0276c9',
    padding: 10,
    margin: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  }, 
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'Cochin',
  },
  infoContainer: {
    flex: 8,
    flexDirection: 'row',
    marginLeft: 10,
  },
  nextLevelContainer: {
    flex: 1,
    marginLeft: 10,
  },  
  quickiesContainer: {
    flex: 2,
  },
  quickies: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Cochin',
  },
});

export default WorkoutsView;

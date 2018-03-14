import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Header from './Header';
import Quickies from './dbstore/Quickies.json';
import Workouts from './dbstore/Workouts.json';
import WorkoutOfTheDayTypes from './dbstore/WorkoutOfTheDayTypes.json';

const QuickiesMap = new Map();
Quickies.map(element => {
  QuickiesMap.set(element.qId, element.qName);
});
const WorkoutOfTheDayTypesMap = new Map();
WorkoutOfTheDayTypes.map(element => {
  WorkoutOfTheDayTypesMap.set(element.wotdId, element.wotdName.toUpperCase());
})

class WorkoutOfTheDay extends Component {
  constructor(props) {
    super(props);

    var date = new Date();
    var dayOfTheWeek = date.getDay();

    let filteredData = []
    Workouts.map(element => {
      if (('wotdId' in element) && (dayOfTheWeek == element.wotdOrder)) {
        filteredData.push(element);
      }
    });
    filteredData = filteredData.sort((a,b) => {
        if (a.wotdId < b.wotdId) {
          return -1;
        }
        if (a.wotdId > b.wotdId) {
          return 1;
        }
        return 0;
      });

    this.state = {
      filteredData: filteredData,
      headerTitle: this.props.headerTitle,
    };
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
      <TouchableHighlight
        onPress={() => this._onSelectSection(workout)}
        style={styles.button} 
        key={workout.wId}
      >
        <View style={styles.workoutRow}>
          <Text style={styles.wotdType}>{WorkoutOfTheDayTypesMap.get(workout.wotdId)}</Text>
          <View style={styles.row}>
            {this._getInfo(workout.qIds)}
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { headerTitle, filteredData } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} />
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
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  workoutRow: {
    flex: 1,
    alignItems: 'center', 
  },
  wotdType: {
    fontSize: 24,    
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Cochin',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
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

export default WorkoutOfTheDay;

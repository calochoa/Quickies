import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableHighlight, 
  ScrollView, 
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Workouts from './dbstore/Workouts.json';
import Quickies from './dbstore/Quickies.json';

const { object } = PropTypes;
const QuickiesMap = new Map();
Quickies.map(element => {
  QuickiesMap.set(element.qId, element.qName);
});

class WorkoutsView extends Component {
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
      name: workout.wName
    });
  }

  _renderRow(workout) {
    return (
      <TouchableHighlight
        onPress={() => this._onSelectSection(workout)}
        style={styles.button} 
        key={workout.wName}
      >
        <View style={styles.row}>
          <Text style={styles.title}>{workout.wName}</Text>
          {this._getInfo(workout.qIds)}
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { headerTitle } = this.props;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} />
        <View style={styles.innerContainer}>
          <ScrollView>
            {Workouts.map((workout) => this._renderRow(workout))}
          </ScrollView>
        </View>
        <Footer navigator={this.props.navigator} />
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
    alignItems: 'center', 
  }, 
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  quickiesContainer: {
    flex: 2,
  },
  quickies: {
    color: '#fff',
    fontSize: 12,
  },
});

export default WorkoutsView;

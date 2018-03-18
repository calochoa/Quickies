import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import WorkoutTypes from './dbstore/WorkoutTypes.json';

const { object } = PropTypes;

class WorkoutTypesView extends Component {
  static propTypes = {
    navigator: object,
  }

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

  _onSelectSection(sectionTitle) {
    this.props.navigator.push({
      id: 'WorkoutsView',
      name: sectionTitle
    });
  }

  renderRow(sectionTitle) {
    return (
      <View style={styles.row} key={sectionTitle}>
        <View style={styles.nextLevelContainer}>
          <TouchableOpacity onPress={() => this._onSelectSection(sectionTitle)} >
            <Image source={require('./images/icons8-info-26.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{sectionTitle}</Text>
        </View>
        <View style={styles.nextLevelContainer}>
          <TouchableOpacity onPress={() => this._onSelectSection(sectionTitle)} >
            <Image source={require('./images/icons8-forward-25-white.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { headerTitle } = this.props;
    const { sectionTitles } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} />
        <View style={styles.innerContainer}>
          {sectionTitles.map((sectionTitle) => this.renderRow(sectionTitle))}
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
  },
  titleContainer: {
    flex: 8,
  },
  nextLevelContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#0276c9',
    padding: 10,
    margin: 15,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});

export default WorkoutTypesView;

import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ListView,
  TouchableHighlight,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Workouts from './dbstore/Workouts.json';
import Quickies from './dbstore/Quickies.json';
import Exercises from './dbstore/Exercises.json';

const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});

class WorkoutsTemplate extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let workoutQuickies = [];
    Workouts.map(element => {
      if (element.wName === this.props.headerTitle) {
        workoutQuickies = element.qIds;
      }
    });

    let filteredData = new Array(workoutQuickies.length);
    Quickies.map(element => {
      let index = workoutQuickies.indexOf(element.qId);
      if (index != -1) {
        filteredData[index] = element;
      }
    });

    this.state = {
      dataSource: ds.cloneWithRows(filteredData),
    };

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(quickie) {
    let jumpTo = () => {
      this.props.navigator.push({
        id: 'QuickieTemplate',
        qId: quickie.qId,
      });
    };

    return (
      <TouchableHighlight style={styles.button} onPress={jumpTo}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {quickie.qName}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
            <Text style={styles.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
            <Text style={styles.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
            <Text style={styles.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { headerTitle } = this.props;
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} />
        <View style={styles.innerContainer}>
          <ListView 
            dataSource={dataSource}
            renderRow={this.renderRow} />
        </View>
        <Footer navigator={this.props.navigator} />
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
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  nameContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 2,
    marginLeft: 10,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    color: '#fff',
    fontSize: 14,
  },
});

export default WorkoutsTemplate;

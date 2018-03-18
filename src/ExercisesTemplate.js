import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import ExerciseTypes from './dbstore/ExerciseTypes.json';
import Exercises from './dbstore/Exercises.json';

const ExerciseTypesMap = new Map();
ExerciseTypes.map(element => {
  ExerciseTypesMap.set(element.etName, element.etId);
})

class ExercisesTemplate extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let filteredData = []
    let exerciseTypeId = ExerciseTypesMap.get(this.props.headerTitle)
    Exercises.map(element => {
      element.eTypes.map(eType => {
        if (eType === exerciseTypeId) {
          filteredData.push(element);
        }
      })
      if (this.props.headerTitle === 'All') {
        filteredData.push(element);
      }
    });

    filteredData = filteredData.sort((a,b) => {
      if (a.eName.toLowerCase() < b.eName.toLowerCase()) {
        return -1;
      }
      if (a.eName.toLowerCase() > b.eName.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    this.state = {
      dataSource: ds.cloneWithRows(filteredData),
      headerTitle: this.props.headerTitle + ' Exercises (' + filteredData.length + ')',
    };
  }

  renderRow(exercise) {
    let jumpTo = () => {
      this.props.navigator.push({
        id: 'ExerciseTemplate',
        eId: exercise.eId,
      });
    };

    return (
      <View style={styles.row} >
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{exercise.eName}</Text>
        </View>
        <TouchableOpacity 
          style={styles.nextLevelContainer}
          onPress={jumpTo}
        >
          <Image source={require('./images/icons8-forward-25-white.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { headerTitle, dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} />
        <View style={styles.innerContainer}>
          <ListView 
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)} />
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
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 30,
    marginRight: 30,
    margin: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  nameContainer: {
    flex: 10,
  },
  nextLevelContainer: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});

export default ExercisesTemplate;

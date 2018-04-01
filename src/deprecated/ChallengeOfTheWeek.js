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
import QuickieOfTheDayTypes from './dbstore/QuickieOfTheDayTypes.json';
import Exercises from './dbstore/Exercises.json';

const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});
const QuickieOfTheDayTypesMap = new Map();
QuickieOfTheDayTypes.map(element => {
  QuickieOfTheDayTypesMap.set(element.qotdId, element.qotdName.toUpperCase());
})

class ChallengeOfTheWeek extends Component {
  constructor(props) {
    super(props);

    var date = new Date();
    var dayOfTheWeek = date.getDay();

    let filteredData = []
    Quickies.map(element => {
      if (('qotdId' in element) && (dayOfTheWeek == element.qotdOrder)) {
        filteredData.push(element);
      }
    });
    filteredData = filteredData.sort((a,b) => {
        if (a.qotdId < b.qotdId) {
          return -1;
        }
        if (a.qotdId > b.qotdId) {
          return 1;
        }
        return 0;
      });

    this.state = {
      headerTitle: this.props.headerTitle,
      filteredData: filteredData,
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
      <TouchableHighlight style={styles.button} onPress={jumpTo} key={quickie.qId}>
        <View style={styles.quickieRow}>
          <Text style={styles.qotdType}>{QuickieOfTheDayTypesMap.get(quickie.qotdId)}</Text>
          <View style={styles.row}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{quickie.qName}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
              <Text style={styles.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
              <Text style={styles.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
              <Text style={styles.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
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
            {filteredData.map((quickie) => this.renderRow(quickie))}
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
  quickieRow: {
    flex: 1,
    alignItems: 'center', 
  },
  qotdType: {
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
  nameContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 2,
    marginLeft: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  info: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Cochin',
  },
});

export default ChallengeOfTheWeek;

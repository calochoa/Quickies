import React, { Component } from 'react';
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
import Exercises from './dbstore/Exercises.json';
import WorkoutTypes from './dbstore/WorkoutTypes.json';

const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});
const WorkoutTypesMap = new Map();
WorkoutTypes.map(element => {
  WorkoutTypesMap.set(element.wtId, element.wtName);
})

class WorkoutsTemplate extends Component {
  constructor(props) {
    super(props);

    let workoutQuickies = [];
    let wtId = ''
    Workouts.map(element => {
      if (element.wId === this.props.wId) {
        workoutQuickies = element.qIds;
        wtId = element.wtId;
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
      headerTitle: WorkoutTypesMap.get(wtId) + ' ' + this.props.headerTitle,
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  getDifficultyImg = (quickie) => {
    let totalImages = quickie.qDifficulty
    let difficultyImg = []
    let numImages = []
    for (let i = 0; i < totalImages; i++) {
      numImages.push(<Image style={styles.imgContainer} source={require('./images/icons8-speed-24.png')} key={i} />)
      if ((i == 1 && totalImages < 6) || (i == 2 && totalImages == 6)) {
        difficultyImg.push(<View style={styles.imgRowContainer} key='1'>{numImages}</View>)
        numImages = []
      }
    }
    difficultyImg.push(<View style={styles.imgRowContainer} key='2'>{numImages}</View>)
    return difficultyImg
  }
  
  renderRow(quickie) {
    let jumpTo = () => {
      this.props.navigator.push({
        id: 'QuickieTemplate',
        qId: quickie.qId,
      });
    };

    return (
      <View style={styles.button} key={quickie.qId}>
        <Text style={styles.name}>{quickie.qName}</Text>
        <View style={styles.row}>
          <View style={styles.difficultyContainer}>
            {this.getDifficultyImg(quickie)}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
            <Text style={styles.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
            <Text style={styles.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
            <Text style={styles.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.nextLevelContainer} 
            onPress={jumpTo}
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
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  difficultyContainer: {
    flex: 4,
  },
  imgRowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgContainer: {
    margin: 3,
  },
  infoContainer: {
    width: 220,
  },
  nextLevelContainer: {
    flex: 1,
    marginRight: 5,
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

export default WorkoutsTemplate;

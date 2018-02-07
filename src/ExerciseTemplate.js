import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ListView,
  WebView,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import ExerciseTypes from './dbstore/ExerciseTypes.json';
import Exercises from './dbstore/Exercises.json';
import Videos from './dbstore/Videos.json';

const ExerciseMap = {};
Exercises.map(element => {
  ExerciseMap[element.eId] = element;
})
const ExerciseTypesMap = new Map();
ExerciseTypes.map(element => {
  ExerciseTypesMap.set(element.etId, element.etName);
})
const VideosMap = new Map();
Videos.map(element => {
  VideosMap.set(element.vId, element.ytId);
})

class ExerciseTemplate extends Component {
  constructor(props) {
    super(props);
    let exercise = ExerciseMap[this.props.eId];
    let ytId = VideosMap.get(exercise.vId);

    this.state = {
      exercise: exercise,
      ytLink: 'https://www.youtube.com/embed/' + ytId + '?rel=0&showinfo=0&mute=1',
    };
  }

  _displayListData(data) {
    return (<Text style={styles.info} key={data}>- {data}</Text>);
  }

  _displayExerciseType(exerciseType) {
    return (this._displayListData(ExerciseTypesMap.get(exerciseType)));
  }

  render() {
    const { exercise, ytLink } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={exercise.eName} />
        <View style={styles.innerContainer}>
          <WebView
            style={styles.videoContainer}
            javaScriptEnabled={true}
            source={{uri: ytLink}} />
          <View style={styles.infoContainer}>
            <View style={styles.subInfoContainer}>
              <Text style={styles.header}>Exercise Type: </Text>
              {exercise.eTypes.map((exerciseType) => this._displayExerciseType(exerciseType))}
            </View>
            <View style={styles.subInfoContainer}>
              <Text style={styles.header}>Description: </Text>
              <Text style={styles.info}>{exercise.description}</Text>
            </View>
          </View>
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
  videoContainer: {
    flex: 2,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#0276c9',
    margin: 20,
  },
  subInfoContainer: {
    margin: 10,
  },
  header: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,    
    color: '#fff',
    marginLeft: 10,
  },
});

export default ExerciseTemplate;

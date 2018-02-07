import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ListView,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Quickies from './dbstore/Quickies.json';
import QuickieTypes from './dbstore/QuickieTypes.json';
import Exercises from './dbstore/Exercises.json';
import ExerciseTypes from './dbstore/ExerciseTypes.json';
import Videos from './dbstore/Videos.json';

const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
})
const QuickieTypesMap = new Map();
QuickieTypes.map(element => {
  QuickieTypesMap.set(element.qtId, element.qtName);
})
const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});
const ExerciseTypesMap = new Map();
ExerciseTypes.map(element => {
  ExerciseTypesMap.set(element.etId, element.etName);
})
const VideosMap = new Map();
Videos.map(element => {
  VideosMap.set(element.vId, element.ytId);
})

class QuickieTemplate extends Component {
  constructor(props) {
    super(props);
    let quickie = QuickieMap[this.props.qId];
    let ytId = VideosMap.get(quickie.vId);

    this.state = {
      quickie: quickie,
      ytImage: 'https://img.youtube.com/vi/' + ytId + '/hqdefault.jpg',
    };
  }

  _displayRepsExer(quickie) {
    return (
      <View style={styles.subInfoContainer}>
        <Text style={styles.header}>Repetitions & Exercises: </Text>
        <Text style={styles.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
        <Text style={styles.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
        <Text style={styles.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
        <Text style={styles.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
      </View>
    );
  }

  render() {
    const { ytImage, quickie } = this.state;

    let _jumpToYtVideo = () => {
      this.props.navigator.push({
        id: 'Video',
        ytId: VideosMap.get(quickie.vId),
      });
    }

    return (
      <View style={styles.container}>
        <Header headerTitle={quickie.qName} />
        <View style={styles.innerContainer}>
          <TouchableHighlight onPress={_jumpToYtVideo}>
            <Image style={styles.videoContainer} source={{uri: ytImage}} />
          </TouchableHighlight>
          <ScrollView style={styles.infoContainer}>
            {this._displayRepsExer(quickie)}
            <View style={styles.subInfoContainer}>
              <Text style={styles.header}>Quickie Type: </Text>
              <Text style={styles.info}>{QuickieTypesMap.get(quickie.qtId)}</Text>
            </View>
            <View style={styles.subInfoContainer}>
              <Text style={styles.header}>History: </Text>
              <Text style={styles.info}>Add history here..</Text>
            </View>
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
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    flex: 1,
  },
  videoContainer: {
    height:210,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: '#0276c9',
    margin: 20,
  },
  subInfoContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#0276c9',
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

export default QuickieTemplate;

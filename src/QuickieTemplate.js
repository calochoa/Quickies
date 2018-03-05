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
import Video from 'react-native-video';
import Header from './Header';
import Footer from './Footer';
import Quickies from './dbstore/Quickies.json';
import QuickieTypes from './dbstore/QuickieTypes.json';
import Exercises from './dbstore/Exercises.json';
import ExerciseTypes from './dbstore/ExerciseTypes.json';
import Videos from './dbstore/Videos.json';
import { vPathMap } from './ExerciseVideoPaths';

const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
})
const QuickieTypesMap = new Map();
QuickieTypes.map(element => {
  QuickieTypesMap.set(element.qtId, element.qtName);
})
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
  VideosMap.set(element.vId, element.vPath);
})

class QuickieTemplate extends Component {
  constructor(props) {
    super(props);
    let quickie = QuickieMap[this.props.qId];

    let vPath1 = VideosMap.get(ExerciseMap[quickie.eId1].vId);
    let vPath2 = VideosMap.get(ExerciseMap[quickie.eId2].vId);
    let vPath3 = VideosMap.get(ExerciseMap[quickie.eId3].vId);
    let vPath4 = VideosMap.get(ExerciseMap[quickie.eId4].vId);

    this.state = {
      quickie: quickie,
      vLink1: vPathMap.get(vPath1),
      vLink2: vPathMap.get(vPath2),
      vLink3: vPathMap.get(vPath3),
      vLink4: vPathMap.get(vPath4),
    };
  }

  _displayRepsExer(quickie) {
    return (
      <View style={styles.subInfoContainer}>
        <Text style={styles.header}>Repetitions & Exercises: </Text>
        <Text style={styles.info}>{quickie.reps1} {ExerciseMap[quickie.eId1].eName}</Text>
        <Text style={styles.info}>{quickie.reps2} {ExerciseMap[quickie.eId2].eName}</Text>
        <Text style={styles.info}>{quickie.reps3} {ExerciseMap[quickie.eId3].eName}</Text>
        <Text style={styles.info}>{quickie.reps4} {ExerciseMap[quickie.eId4].eName}</Text>
      </View>
    );
  }

  _displayExerVid(vLink) {
    return (
      <Video source={vLink}                      // Can be a URL or a local file. 
         ref={(ref) => { this.player = ref }}    // Store reference 
         rate={1.0}                              // 0 is paused, 1 is normal. 
         volume={0}                              // 0 is muted, 1 is normal. 
         muted={false}                           // Mutes the audio entirely. 
         paused={false}                          // Pauses playback entirely. 
         repeat={true}                           // Repeat forever. 
         playInBackground={false}                // Audio continues to play when app entering background. 
         playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown. 
         ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual. 
         progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms) 
         onLoadStart={this.loadStart}            // Callback when video starts to load 
         onLoad={this.setDuration}               // Callback when video loads 
         onProgress={this.setTime}               // Callback every ~250ms with currentTime 
         onEnd={this.onEnd}                      // Callback when playback finishes 
         onError={this.videoError}               // Callback when video cannot be loaded 
         onBuffer={this.onBuffer}                // Callback when remote video is buffering 
         onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata 
         style={styles.backgroundVideo} />
    )
  }

  render() {
    const { quickie, vLink1, vLink2, vLink3, vLink4 } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={quickie.qName} />
        <View style={styles.innerContainer}>
          <View style={styles.videoContainer}>
            <View style={styles.videoRow}>
              {this._displayExerVid(vLink1)}
              {this._displayExerVid(vLink2)}
            </View>
            <View style={styles.videoRow}>
              {this._displayExerVid(vLink3)}
              {this._displayExerVid(vLink4)}
            </View>
          </View>
          <ScrollView style={styles.infoContainer}>
            {this._displayRepsExer(quickie)}
            <View style={styles.subInfoContainer}>
              <Text style={styles.header}>Quickie Type: </Text>
              <Text style={styles.info}>{QuickieTypesMap.get(quickie.qtId)}</Text>
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
    flex: 3,
  },
  videoRow: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundVideo: {
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  info: {
    fontSize: 18,    
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Cochin',
  },
});

export default QuickieTemplate;

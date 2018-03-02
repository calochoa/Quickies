import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ListView,
  WebView,
} from 'react-native';
//import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Header from './Header';
import Footer from './Footer';
import ExerciseTypes from './dbstore/ExerciseTypes.json';
import Exercises from './dbstore/Exercises.json';
import Videos from './dbstore/Videos.json';
import { vPathMap } from './ExerciseVideoPaths';

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

class ExerciseTemplate extends Component {
  constructor(props) {
    super(props);
    let exercise = ExerciseMap[this.props.eId];
    let vPath = VideosMap.get(exercise.vId);

    this.state = {
      exercise: exercise,
      vLink: vPathMap.get(vPath),
    };
  }

  _displayListData(data) {
    return (<Text style={styles.info} key={data}>- {data}</Text>);
  }

  _displayExerciseType(exerciseType) {
    return (this._displayListData(ExerciseTypesMap.get(exerciseType)));
  }

  render() {
    const { exercise, vLink } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={exercise.eName} />
        <View style={styles.innerContainer}>
          <VideoPlayer source={vLink}                // Can be a URL or a local file. 
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
          <View style={styles.infoContainer}>
            <View style={styles.subInfoContainer}>
              <Text style={styles.header}>Exercise Type: </Text>
              {exercise.eTypes.map((exerciseType) => this._displayExerciseType(exerciseType))}
            </View>
            {/* TODO: add description
            <View style={styles.subInfoContainer}>
              <Text style={styles.header}>Description: </Text>
              <Text style={styles.info}>{exercise.description}</Text>
            </View>
            */}
          </View>
        </View>
        <Footer navigator={this.props.navigator} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 3,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    flex: 3,
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

export default ExerciseTemplate;

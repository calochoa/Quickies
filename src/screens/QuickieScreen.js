import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Video from 'react-native-video';
import Quickies from '../dbstore/Quickies.json';
import Exercises from '../dbstore/Exercises.json';
import Videos from '../dbstore/Videos.json';
import QuickieModes from '../dbstore/QuickieModes.json';
import { vPathMap } from '../misc/ExerciseVideoPaths';
import MenuIcon from '../components/MenuIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieStyle from '../style/QuickieStyle';
import SmallForwardIcon from '../components/SmallForwardIcon';


const QuickieMap = {}
Quickies.map(element => {
  QuickieMap[element.qId] = element;
})
const ExerciseMap = {};
Exercises.map(element => {
  ExerciseMap[element.eId] = element;
})
const VideosMap = new Map();
Videos.map(element => {
  VideosMap.set(element.vId, element.vPath);
})
const qvFactorMap = new Map();
QuickieModes.map(element => {
  qvFactorMap.set(element.qvName, element.qvFactor);
})


class QuickieScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.quickieName : 'Unknown Quickie',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    let quickie = QuickieMap[params.quickieId];

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
      qMode: params.qMode,
    };
  }

  _getRepExerciseRow(qvFactor, reps, exerciseId) {
    return (
      <Text style={QuickieStyle.info}>{Math.ceil(qvFactor * reps)} {ExerciseMap[exerciseId].eName}</Text>
    )
  }

  _displayRepsExer(quickie, qvFactor) {
    return (
      <View style={QuickieStyle.infoContainer}>
        <Text style={QuickieStyle.infoTitle}>Repetitions & Exercises: </Text>
        {this._getRepExerciseRow(qvFactor, quickie.reps1, quickie.eId1)}
        {this._getRepExerciseRow(qvFactor, quickie.reps2, quickie.eId2)}
        {this._getRepExerciseRow(qvFactor, quickie.reps3, quickie.eId3)}
        {this._getRepExerciseRow(qvFactor, quickie.reps4, quickie.eId4)}
      </View>
    );
  }

  _displayExerVid(vLink, eId) {
    return (
      <TouchableWithoutFeedback 
        style={QuickieStyle.row}
        onPress={() => {
          this.props.navigation.navigate('Exercise', {
            exerciseId: eId,
            exerciseName: ExerciseMap[eId].eName,
          });
        }}
      >
        <Video source={vLink}                      // Can be a URL or a local file. 
           ref={(ref) => { this.player = ref }}    // Store reference 
           rate={1.0}                              // 0 is paused, 1 is normal. 
           volume={0}                              // 0 is muted, 1 is normal. 
           muted={true}                            // Mutes the audio entirely. 
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
           style={QuickieStyle.video} 
        />
      </TouchableWithoutFeedback>
    )
  }

  _displayExeriseText(vLink, eId) {
    return (
      <TouchableOpacity 
        style={QuickieStyle.row}
        onPress={() => {
          this.props.navigation.navigate('Exercise', {
            exerciseId: eId,
            exerciseName: ExerciseMap[eId].eName,
          });
        }}
      >
        <View style={QuickieStyle.exerciseTextContainer}>
          <Text style={QuickieStyle.exerciseText}>{ExerciseMap[eId].eName}</Text>
          <View style={QuickieStyle.smallForwardIconContainer}>
            <SmallForwardIcon />
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { quickie, vLink1, vLink2, vLink3, vLink4, qMode } = this.state;
    let qvFactor = (typeof qMode != 'undefined') ? qvFactorMap.get(qMode) : 1

    return (
      <View style={MainContainerStyle.container}>
      <ScrollView>
        <View>
          <View style={QuickieStyle.videosContainer}>
            {this._displayExerVid(vLink1, quickie.eId1)}
            {this._displayExerVid(vLink2, quickie.eId2)}
          </View>
          <View style={QuickieStyle.exercisesTextRowContainer}>
            {this._displayExeriseText(vLink1, quickie.eId1)}
            {this._displayExeriseText(vLink2, quickie.eId2)}
          </View>
        </View>
        <View>
          <View style={QuickieStyle.videosContainer}>
            {this._displayExerVid(vLink3, quickie.eId3)}
            {this._displayExerVid(vLink4, quickie.eId4)}
          </View>
          <View style={QuickieStyle.exercisesTextRowContainer}>
            {this._displayExeriseText(vLink3, quickie.eId3)}
            {this._displayExeriseText(vLink4, quickie.eId4)}
          </View>
        </View>
        <View style={QuickieStyle.detailsContainer}>
-          <LinearGradient colors={getGradientColor(qMode)}>
-            {this._displayRepsExer(quickie, qvFactor)}
-          </LinearGradient>
-        </View>
      </ScrollView>
      </View>
    );
  }
}


export default QuickieScreen;

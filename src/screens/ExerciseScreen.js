import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Video from 'react-native-video';
import BodySplits from '../dbstore/BodySplits.json';
import Exercises from '../dbstore/Exercises.json';
import Videos from '../dbstore/Videos.json';
import { vPathMap } from '../misc/ExerciseVideoPaths';
import MenuIcon from '../components/MenuIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import ExerciseStyle from '../style/ExerciseStyle';


const ExerciseMap = {};
Exercises.map(element => {
  ExerciseMap[element.eId] = element;
})
const BodySplitsMap = new Map();
BodySplits.map(element => {
  BodySplitsMap.set(element.etId, element.etName);
})
const VideosMap = new Map();
Videos.map(element => {
  VideosMap.set(element.vId, element.vPath);
})


class ExerciseScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.exerciseName : 'Unknown Exercise',
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

    let exercise = ExerciseMap[params.exerciseId];
    let vPath = VideosMap.get(exercise.vId);

    this.state = {
      exercise: exercise,
      vLink: vPathMap.get(vPath),
    };
  }

  _displayListData(data) {
    return (<Text style={ExerciseStyle.info} key={data}>- {data}</Text>);
  }

  _displayExerciseType(exerciseType) {
    return (this._displayListData(BodySplitsMap.get(exerciseType)));
  }

  render() {
    const { exercise, vLink } = this.state;

    return (
      <View style={MainContainerStyle.container}>
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
           style={ExerciseStyle.video} 
        />
        <LinearGradient 
          colors={getGradientColor('default')}
          style={ExerciseStyle.detailsContainer}
        >
          <View style={ExerciseStyle.infoContainer}>
            <Text style={ExerciseStyle.infoTitle}>Exercise Type: </Text>
            {this._displayExerciseType(exercise.eType)}
          </View>
          <View style={ExerciseStyle.infoContainer}>
            <Text style={ExerciseStyle.infoTitle}>Description: </Text>
            <Text style={ExerciseStyle.info}>{exercise.description}</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}


export default ExerciseScreen;

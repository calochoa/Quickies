import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  FlatList, 
  Text, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import BodySplits from '../dbstore/BodySplits.json';
import ExerciseTypes from '../dbstore/ExerciseTypes.json';
import ExerciseLevels from '../dbstore/ExerciseLevels.json';
import Exercises from '../dbstore/Exercises.json';
import MenuIcon from '../components/MenuIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import ExercisesRowStyle from '../style/ExercisesRowStyle';
import ExercisesHeader from '../components/ExercisesHeader';
import ExerciseTypesHeader from '../components/ExerciseTypesHeader';
import BodySplitsFooter from '../components/BodySplitsFooter';
import { exerciseLookupHeaderMap } from '../misc/ExerciseLookupHeader';


let numBodySplits = 0;
BodySplits.map(element => { numBodySplits++; })

let numExerciseTypes = 0;
ExerciseTypes.map(element => { numExerciseTypes++; })

let numExerciseLevels = 0;
ExerciseLevels.map(element => { numExerciseLevels++; })


class ExercisesScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let eLookup = params.bodySplit + '.' + params.eType + '.' + params.eLevel;
    let title = navigation.state.params.title;
    if (typeof(navigation.state.params)==='undefined' 
      || typeof(navigation.state.params.title) === 'undefined') {
      title = exerciseLookupHeaderMap.get(eLookup)
    }

    return {
      title: title,
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };

  sortDiffAlpha(filteredData) {
    return filteredData.sort((a,b) => {
      if (a.eName.toLowerCase() < b.eName.toLowerCase()) {
        return -1;
      }
      if (a.eName.toLowerCase() > b.eName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    let eCompleteMap = {};
    for (i = 0; i < numBodySplits; i++) {
      for (j = 0; j < numExerciseTypes; j++) {
        for (k = -1; k < numExerciseLevels; k++) {
          let level = (k == -1 ? 'All' : k);
          eCompleteMap['bs000'+i+'.et000'+j+'.'+level] = [];
        }
      }
    }

    this.sortDiffAlpha(Exercises).map(element => {
      // compile all exercises
      eCompleteMap['bs0000.et0000.All'].push({key:element.eId, exercise:element});
      eCompleteMap['bs0000.et0000.'+element.eLevel].push({key:element.eId, exercise:element});
      // compile all body split exercises
      if (element.bsId !== 'bs0000') {
        eCompleteMap[element.bsId+'.et0000.All'].push({key:element.eId, exercise:element})
        eCompleteMap[element.bsId+'.et0000.'+element.eLevel].push({key:element.eId, exercise:element})
      }
      // compile all type specific exercises
      if (element.etId !== 'et0000') {
        eCompleteMap['bs0000.'+element.etId+'.All'].push({key:element.eId, exercise:element})
        eCompleteMap['bs0000.'+element.etId+'.'+element.eLevel].push({key:element.eId, exercise:element})
      }
      // compile remaining exercises
      if (element.bsId !== 'bs0000' && element.etId !== 'et0000') {
        eCompleteMap[element.bsId+'.'+element.etId+'.'+element.eLevel].push({key:element.eId, exercise:element})
      }
    });

    let eLookup = params.bodySplit + '.' + params.eType + '.' + params.eLevel;
    this.state = {
      eLookup: eLookup,
      eCompleteMap: eCompleteMap,
      bodySplit: params.bodySplit,
      eType: params.eType,
      eLevel: params.eLevel,
      eTypeVisible: false,
      eRefresh: false,
    };
  }

  renderRow(exercise) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={ExercisesRowStyle.container} 
        key={exercise.eId}
      >
        <View style={ExercisesRowStyle.nameContainer}>
          <Text style={ExercisesRowStyle.name}>{exercise.eName}</Text>
        </View>
        <TouchableOpacity 
          style={MainRowStyle.nextLevelContainer}
          onPress={() => {
            this.props.navigation.navigate('Exercise', {
              exerciseId: exercise.eId,
              exerciseName: exercise.eName,
            });
          }}
        >
          <ForwardIcon />
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  setBodySplit(bodySplit) {
    const update = {}
    update['bodySplit'] = bodySplit
    this.setState(update);
    
    let eLookupVal = bodySplit + '.' + this.state.eType + '.' + this.state.eLevel
    const update2 = {}
    update2['eLookup'] = eLookupVal
    this.setState(update2);

    this.setHeaderTitle(eLookupVal)
  }

  setELevel(eLevel) {
    const update = {}
    update['eLevel'] = eLevel
    this.setState(update);

    let eLookupVal = this.state.bodySplit + '.' + this.state.eType + '.' + eLevel
    const update2 = {}
    update2['eLookup'] = eLookupVal
    this.setState(update2);

    this.setHeaderTitle(eLookupVal)
  }

  setEType(eType) {
    const update = {}
    update['eType'] = eType
    this.setState(update);

    let eLookupVal = this.state.bodySplit + '.' + eType + '.' + this.state.eLevel
    const update2 = {}
    update2['eLookup'] = eLookupVal
    this.setState(update2);

    this.setHeaderTitle(eLookupVal)

    //TODO: figure out if this is necessary
    let eRefresh = !this.state.eRefresh
    const update3 = {}
    update3['eRefresh'] = eRefresh
    this.setState(update3);
  }

  setHeaderTitle(eLookupVal) {
    this.props.navigation.setParams({ title: exerciseLookupHeaderMap.get(eLookupVal) })
  }

  showEType(visible) {
    const update = {}
    update['eTypeVisible'] = visible
    this.setState(update);
  }

  render() {
    const { eLookup, eCompleteMap, bodySplit, eType, eLevel, eTypeVisible, eRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ExercisesHeader setELevel={this.setELevel.bind(this)} showEType={this.showEType.bind(this)} />
        {/*eTypeVisible ? <ExerciseTypesHeader setEType={this.setEType.bind(this)} eType={eType} /> : null*/}
        <FlatList
          data={eCompleteMap[eLookup]}
          renderItem={({item}) => this.renderRow(item.exercise)}
          extraData={eRefresh}
        />
        <BodySplitsFooter setBodySplit={this.setBodySplit.bind(this)} />
      </View>
    );
  }
}


export default ExercisesScreen;

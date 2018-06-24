import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  FlatList, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import BodySplits from '../dbstore/BodySplits.json';
import WorkoutLevels from '../dbstore/WorkoutLevels.json';
import Workouts from '../dbstore/Workouts.json';
import MenuIcon from '../components/MenuIcon';
import WorkoutRow from '../components/WorkoutRow';
import WorkoutsHeader from '../components/WorkoutsHeader';
import BodySplitsFooter from '../components/BodySplitsFooter';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieRowStyle from '../style/QuickieRowStyle';
import { workoutLookupHeaderMap } from '../misc/WorkoutLookupHeader';


let numBodySplits = 0;
BodySplits.map(element => { numBodySplits++; })

let numWorkoutsLevels = 0;
WorkoutLevels.map(element => { numWorkoutsLevels++; })


class WorkoutsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let wLookup = params.bodySplit + '.' + params.wLevel
    let title = navigation.state.params.title;
    if (typeof(navigation.state.params)==='undefined' 
      || typeof(navigation.state.params.title) === 'undefined') {
      title = workoutLookupHeaderMap.get(wLookup)
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
      if (a.wDifficulty < b.wDifficulty) {
        return -1;
      }
      if (a.wDifficulty > b.wDifficulty) {
        return 1;
      }
      if (a.wName.toLowerCase() < b.wName.toLowerCase()) {
        return -1;
      }
      if (a.wName.toLowerCase() > b.wName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    let wCompleteMap = {};
    for (i = 0; i < numBodySplits; i++) {
      for (j = 0; j <= numWorkoutsLevels; j++) {
        let difficulty = (j == 0 ? 'All' : j);
        wCompleteMap['bs000'+i+'.'+difficulty] = [];
      }
    }

    this.sortDiffAlpha(Workouts).map(element => {
      // compile all body split quickies
      wCompleteMap['bs0000.All'].push({key:element.wId, workout:element});
      wCompleteMap[element.bsId+'.All'].push({key:element.wId, workout:element})
      // compile all level quickies
      wCompleteMap['bs0000.'+element.wDifficulty].push({key:element.wId, workout:element})
      wCompleteMap[element.bsId+'.'+element.wDifficulty].push({key:element.wId, workout:element})
    });

    let wLookup = params.bodySplit + '.' + params.wLevel

    this.state = {
      wLookup: wLookup,
      wCompleteMap: wCompleteMap,
      bodySplit: params.bodySplit,
      wLevel: params.wLevel,
      bs: params.bs,
      wRefresh: false,
    };
  }

  renderRow(workout) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={QuickieRowStyle.container} 
        key={workout.wId+'.'+this.state.qRefresh}
      >
        <WorkoutRow workout={workout} navigation={this.props.navigation} key={workout.wId} />
      </LinearGradient>
    );
  }

  setBodySplit(bodySplit) {
    const update = {}
    update['bodySplit'] = bodySplit
    this.setState(update);
    
    let wLookupVal = bodySplit + '.' + this.state.wLevel
    const update2 = {}
    update2['wLookup'] = wLookupVal
    this.setState(update2);

    this.setHeaderTitle(wLookupVal)
  }

  setWLevel(wLevel) {
    const update = {}
    update['wLevel'] = wLevel
    this.setState(update);

    let wLookupVal = this.state.bodySplit + '.' + wLevel
    const update2 = {}
    update2['wLookup'] = wLookupVal
    this.setState(update2);

    this.setHeaderTitle(wLookupVal)
  }

  setHeaderTitle(wLookupVal) {
    this.props.navigation.setParams({ title: workoutLookupHeaderMap.get(wLookupVal) })
  }

  render() {
    const { wLookup, wCompleteMap, bodySplit, wLevel, bs, wRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <WorkoutsHeader setWLevel={this.setWLevel.bind(this)}/>
        <FlatList
          data={wCompleteMap[wLookup]}
          renderItem={({item}) => this.renderRow(item.workout)}
          extraData={wRefresh}
        />
        <BodySplitsFooter setBodySplit={this.setBodySplit.bind(this)}/>
      </View>
    );
  }
}


export default WorkoutsScreen;

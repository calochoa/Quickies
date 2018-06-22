import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  FlatList, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import Workouts from '../dbstore/Workouts.json';
import MenuIcon from '../components/MenuIcon';
import WorkoutRow from '../components/WorkoutRow';
import WorkoutsHeader from '../components/WorkoutsHeader';
import WorkoutsFooter from '../components/WorkoutsFooter';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickieRowStyle from '../style/QuickieRowStyle';
import { workoutLookupHeaderMap } from '../misc/WorkoutLookupHeader';


class WorkoutsScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    let wLookup = params.wBodySplit + '.' + params.wLevel
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

    let maxBodySplits = 5;
    let maxDifficulty = 5;
    let wCompleteMap = {};
    for (i = 0; i < maxBodySplits; i++) {
      for (j = 0; j <= maxDifficulty; j++) {
        let difficulty = (j == 0 ? 'All' : j);
        wCompleteMap['wbs000'+i+'.'+difficulty] = [];
      }
    }

    this.sortDiffAlpha(Workouts).map(element => {
      // compile all body split quickies
      wCompleteMap['wbs0000.All'].push({key:element.wId, workout:element});
      wCompleteMap[element.wbsId+'.All'].push({key:element.wId, workout:element})
      // compile all level quickies
      wCompleteMap['wbs0000.'+element.wDifficulty].push({key:element.wId, workout:element})
      wCompleteMap[element.wbsId+'.'+element.wDifficulty].push({key:element.wId, workout:element})
    });

    let wLookup = params.wBodySplit + '.' + params.wLevel

    this.state = {
      wLookup: wLookup,
      wCompleteMap: wCompleteMap,
      wBodySplit: params.wBodySplit,
      wLevel: params.wLevel,
      wbs: params.wbs,
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

  setWBodySplit(wBodySplit) {
    const update = {}
    update['wBodySplit'] = wBodySplit
    this.setState(update);
    
    let wLookupVal = wBodySplit + '.' + this.state.wLevel
    const update2 = {}
    update2['wLookup'] = wLookupVal
    this.setState(update2);

    this.setHeaderTitle(wLookupVal)
  }

  setWLevel(wLevel) {
    const update = {}
    update['wLevel'] = wLevel
    this.setState(update);

    let wLookupVal = this.state.wBodySplit + '.' + wLevel
    const update2 = {}
    update2['wLookup'] = wLookupVal
    this.setState(update2);

    this.setHeaderTitle(wLookupVal)
  }

  setHeaderTitle(wLookupVal) {
    this.props.navigation.setParams({ title: workoutLookupHeaderMap.get(wLookupVal) })
  }

  render() {
    const { wLookup, wCompleteMap, wBodySplit, wLevel, wbs, wRefresh } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <WorkoutsHeader setWLevel={this.setWLevel.bind(this)}/>
        <FlatList
          data={wCompleteMap[wLookup]}
          renderItem={({item}) => this.renderRow(item.workout)}
          extraData={wRefresh}
        />
        <WorkoutsFooter setWBodySplit={this.setWBodySplit.bind(this)}/>
      </View>
    );
  }
}


export default WorkoutsScreen;

import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import WeeklyChallengeFooterStyle from '../style/WeeklyChallengeFooterStyle';
import WeekDataInfo from '../dbstore/WeekDataInfo.json';
import { weekImagePathMap } from '../misc/WeekImagePaths';


class WeeklyChallengeFooter extends Component {

  sortOrder(data) {
    return data.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });
  }

  constructor(props) {
    super(props);

    let weekDataArr = []
    this.sortOrder(WeekDataInfo).map(element => {
      weekDataArr.push(element);
    });

    this.state = {
      'Current': true,
      'Previous': false,
      'Next': false,
      weekDataArr: weekDataArr,
      setWeekType: this.props.setWeekType,
      currentWeekType: this.props.currentWeekType,
      previousWeekType: this.props.previousWeekType,
      nextWeekType: this.props.nextWeekType,
    };
  }

  setHighlighted(week) {
    const update = {}
    update['Current'] = false
    update['Previous'] = false
    update['Next'] = false
    update[week] = true
    this.setState(update);
  }

  renderWeekData(weekData) {
    let week = weekData.week
    let weekStyle = this.state[week] ? 
      WeeklyChallengeFooterStyle.selectedWeekText : WeeklyChallengeFooterStyle.weekText;
    let imageSrc = this.state[week] ? weekImagePathMap.get(week + ' Selected') 
      : weekImagePathMap.get(week);
    let weekType = week == 'Previous' ? this.state.previousWeekType : 
      (week == 'Next' ? this.state.nextWeekType : this.state.currentWeekType)

    return (
      <TouchableOpacity 
        style={WeeklyChallengeFooterStyle.weekContainer}
        key={week}
        onPress={() => { this.state.setWeekType(weekType); this.setHighlighted(week); }}
      >
        <Image source={imageSrc}/>
        <Text style={weekStyle}>{week} Week</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { weekDataArr } = this.state;

    return (
      <LinearGradient colors={getGradientColor('WeekFooter')} style={WeeklyChallengeFooterStyle.container}>
        {weekDataArr.map((weekData) => this.renderWeekData(weekData))}
      </LinearGradient>
    );
  }
}


export default WeeklyChallengeFooter;

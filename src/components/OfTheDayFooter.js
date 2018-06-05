import React, { Component } from 'react';
import {
  TouchableOpacity, 
  Text, 
  View, 
  Image, 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import OfTheDayFooterStyle from '../style/OfTheDayFooterStyle';
import InfoIconSmall from '../components/InfoIconSmall';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import OfTheDayInfo from '../dbstore/OfTheDayInfo.json';
import { dayImagePathMap } from '../misc/DayImagePaths';


class OfTheDayFooter extends Component {

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

    let otdInfo = []
    let otdDataArr = []
    this.sortOrder(OfTheDayInfo).map(element => {
      otdInfo.push(element.day.toUpperCase() + ' - ' + element.description);
      otdDataArr.push(element);
    });

    var dayOfTheWeek = new Date().getDay();

    this.state = {
      'Sunday': dayOfTheWeek == 0,
      'Monday': dayOfTheWeek == 1,
      'Tuesday': dayOfTheWeek == 2,
      'Wednesday': dayOfTheWeek == 3,
      'Thursday': dayOfTheWeek == 4,
      'Friday': dayOfTheWeek == 5,
      'Saturday': dayOfTheWeek == 6,
      setDayOfTheWeek: this.props.setDayOfTheWeek,
      otdInfo: otdInfo,
      otdDataArr: otdDataArr,
      type: this.props.type,
    };
  }

  setModalVisible(id, visible) {
    const update = {}
    update[id] = visible
    this.setState(update);
  }

  renderOverlay(id) {
    return (
      <Overlay 
        visible={this.state[id]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(id, false);}}
      >
        <Text style={OverlayStyle.header}>{this.state.type} of the Day{'\n'}Breakdown</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{this.state.otdInfo.join('\n\n')}</Text>
      </Overlay>
    )
  }

  setHighlighted(day) {
    const update = {}
    update['Monday'] = false
    update['Tuesday'] = false
    update['Wednesday'] = false
    update['Thursday'] = false
    update['Friday'] = false
    update['Saturday'] = false
    update['Sunday'] = false
    update[day] = true
    this.setState(update);
  }

  renderDayOfTheWeek(day, dotw, dayType) {
    let dayStyle = this.state[day] ? 
      OfTheDayFooterStyle.selectedDayText : OfTheDayFooterStyle.dayText;
    let imageSrc = this.state[day] ? dayImagePathMap.get(day + ' Selected') 
      : dayImagePathMap.get(day);

    return (
      <TouchableOpacity 
        style={OfTheDayFooterStyle.dayContainer}
        key={day}
        onPress={() => { this.state.setDayOfTheWeek(dotw); this.setHighlighted(day); }}
      >
        <Image source={imageSrc}/>
        <Text style={dayStyle}>{dayType}</Text>
      </TouchableOpacity>
    );
  }

  renderOfTheDayData(otdData) {
    let day = otdData.day
    let dayStyle = this.state[day] ? 
      OfTheDayFooterStyle.selectedDayText : OfTheDayFooterStyle.dayText;
    let imageSrc = this.state[day] ? dayImagePathMap.get(day + ' Selected') 
      : dayImagePathMap.get(day);

    return (
      <TouchableOpacity 
        style={OfTheDayFooterStyle.dayContainer}
        key={day}
        onPress={() => { this.state.setDayOfTheWeek(otdData.dotw); this.setHighlighted(day); }}
      >
        <Image source={imageSrc}/>
        <Text style={dayStyle}>{otdData.otdType}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { otdDataArr } = this.state;

    return (
      <LinearGradient colors={getGradientColor('OfTheDayFooter')} style={OfTheDayFooterStyle.container}>
        {this.renderOverlay('dayInfo')}
        {otdDataArr.map((otdData) => this.renderOfTheDayData(otdData))}
        {/*this.renderDayOfTheWeek('Mon', 1, 'Cardio')}
        {this.renderDayOfTheWeek('Tue', 2, 'Upper')}
        {this.renderDayOfTheWeek('Wed', 3, 'Lower')}
        {this.renderDayOfTheWeek('Thu', 4, 'Core')}
        {this.renderDayOfTheWeek('Fri', 5, 'Total')}
        {this.renderDayOfTheWeek('Sat', 6, 'Cardio')}
        {this.renderDayOfTheWeek('Sun', 0, 'Bar')*/}
        <TouchableOpacity 
          style={OfTheDayFooterStyle.dayInfoContainer}
          onPress={() => {this.setModalVisible('dayInfo', true);}}
        >
          <InfoIconSmall />
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}


export default OfTheDayFooter;

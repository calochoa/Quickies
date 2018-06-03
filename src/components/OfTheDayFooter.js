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
    this.sortOrder(OfTheDayInfo).map(element => {
      otdInfo.push(element.day.toUpperCase() + ' - ' + element.description);
    });

    var dayOfTheWeek = new Date().getDay();

    this.state = {
      'Sun': dayOfTheWeek == 0,
      'Mon': dayOfTheWeek == 1,
      'Tue': dayOfTheWeek == 2,
      'Wed': dayOfTheWeek == 3,
      'Thu': dayOfTheWeek == 4,
      'Fri': dayOfTheWeek == 5,
      'Sat': dayOfTheWeek == 6,
      setDayOfTheWeek: this.props.setDayOfTheWeek,
      otdInfo: otdInfo,
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
    update['Mon'] = false
    update['Tue'] = false
    update['Wed'] = false
    update['Thu'] = false
    update['Fri'] = false
    update['Sat'] = false
    update['Sun'] = false
    update[day] = true
    this.setState(update);
  }

  renderDayOfTheWeek(day, dotw) {
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
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <LinearGradient colors={getGradientColor('OfTheDayFooter')} style={OfTheDayFooterStyle.container}>
        {this.renderOverlay('dayInfo')}
        {this.renderDayOfTheWeek('Mon', 1)}
        {this.renderDayOfTheWeek('Tue', 2)}
        {this.renderDayOfTheWeek('Wed', 3)}
        {this.renderDayOfTheWeek('Thu', 4)}
        {this.renderDayOfTheWeek('Fri', 5)}
        {this.renderDayOfTheWeek('Sat', 6)}
        {this.renderDayOfTheWeek('Sun', 0)}
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

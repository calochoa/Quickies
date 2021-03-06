import React from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickieOptions from '../dbstore/QuickieOptions.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';


const QuickieOptionsMap = {};
QuickieOptions.map(element => {
  QuickieOptionsMap[element.qoName] = element;
})


class QuickieOptionsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Quickies',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Quickies',
    };
  };

  constructor(props) {
    super(props);

    let sectionTitles = []
    QuickieOptions.map(element => {
      sectionTitles.push(element.qoName);
    });

    this.state = {
      sectionTitles: sectionTitles,
    };
  }

  setModalVisible(sectionTitle, visible) {
    const update = {}
    update[sectionTitle] = visible
    this.setState(update);
  }

  renderOverlay(sectionTitle) {
    return (
      <Overlay 
        visible={this.state[sectionTitle]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(sectionTitle, false);}}
      >
        <Text style={OverlayStyle.header}>{QuickieOptionsMap[sectionTitle].qoHeader}</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{QuickieOptionsMap[sectionTitle].qoDescription}</Text>
      </Overlay>
    )
  }

  renderRow(section, image) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={MainRowStyle.container} 
        key={section.title}
      >
        {this.renderOverlay(section.title)}
        <TouchableOpacity 
          style={MainRowStyle.infoLevelContainer} 
          onPress={() => {this.setModalVisible(section.title, true);}}
        >
          <InfoIcon />
        </TouchableOpacity>
        <View style={MainRowStyle.titleContainer}>
          <Text style={MainRowStyle.title}>
            <View style={{marginRight: 5}}>
              {image}
            </View>
            {section.title}
          </Text>
        </View>
        <View style={MainRowStyle.nextLevelContainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate(section.screen, section.extra);}}>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  render() {
    return (
      <View style={MainContainerStyle.container}>
        {this.renderRow({title: 'by Level', screen: 'QuickieLevels'})}
        {this.renderRow({title: 'by Type', screen: 'QuickieTypes'})}
        {this.renderRow({title: 'by Body Split', screen: 'QuickieBodySplits'})}
        {this.renderRow({title: 'by Mode', screen: 'QuickieModes'})}
        {this.renderRow({title: 'by Name', screen: 'Quickies', extra: {qBodySplit: 'qbs0000', qLevel: 'All'}})}
        {this.renderRow(
          {title: 'Favorite', screen: 'MultipleModesQuickies', extra: {quickieType: 'Favorite'}}, 
          <Image source={require('../images/icons8-star-26-gold.png')} />
        )}
        {this.renderRow(
          {title: 'Completed', screen: 'MultipleModesQuickies', extra: {quickieType: 'Completed'}}, 
          <Image source={require('../images/icons8-completed-26-green.png')} />
        )}
      </View>
    );
  }
}


export default QuickieOptionsScreen;

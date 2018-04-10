import React from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import QuickieModes from '../dbstore/QuickieModes.json';
import MenuIcon from '../components/MenuIcon';
import InfoIcon from '../components/InfoIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';
import { difficultyImagePathMap } from '../misc/DifficultyImagePaths';


const QuickieModesMap = {};
QuickieModes.map(element => {
  QuickieModesMap[element.qvName] = element;
})


class QuickieModesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Quickie Modes',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Quickie Modes',
    };
  };

  constructor(props) {
    super(props);

    let sectionTitles = []
    QuickieModes.map(element => {
      sectionTitles.push(element.qvName);
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
        <Text style={OverlayStyle.header}>{QuickieModesMap[sectionTitle].qvHeader}</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{QuickieModesMap[sectionTitle].qvDescription}</Text>
      </Overlay>
    )
  }

  renderRow(sectionTitle) {
    return (
      <LinearGradient 
        colors={getGradientColor(sectionTitle)} 
        style={[MainRowStyle.container, MainRowStyle.extra15Margin]} 
        key={sectionTitle}
      >
        {this.renderOverlay(sectionTitle)}
        <TouchableOpacity 
          style={MainRowStyle.infoLevelContainer} 
          onPress={() => {this.setModalVisible(sectionTitle, true);}}
        >
          <InfoIcon />
        </TouchableOpacity>
        <View style={MainRowStyle.titleContainer}>
          <Text style={MainRowStyle.title}>
            <View style={{marginRight: 10}}>
              <Image source={difficultyImagePathMap.get(sectionTitle)} />
            </View>
            {sectionTitle}
          </Text>
        </View>
        <View style={MainRowStyle.nextLevelContainer}>
          <TouchableOpacity 
            onPress={() => {
              this.props.navigation.navigate('Quickies', {quickieType: 'All', qMode: sectionTitle});
            }}
          >
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  render() {
    const { sectionTitles } = this.state;

    return (
      <View style={MainContainerStyle.containerNoSpaceAround}>
        {sectionTitles.map((sectionTitle) => this.renderRow(sectionTitle))}
      </View>
    );
  }
}


export default QuickieModesScreen;

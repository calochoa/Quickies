import React from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import MenuIcon from '../components/MenuIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: 'Home',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Home',
    };
  };

  state = {
    section1: {title: 'Quickies', screen: 'QuickieOptions'},
    section2: {title: 'Quickie of the Day', screen: 'QuickieOfTheDay'},
    section3: {title: 'Workout of the Day', screen: 'WorkoutOfTheDay'},
    section4: {title: 'Weekly Challenge', screen: 'WeeklyChallenge'},
    section5: {title: 'Workouts', screen: 'WorkoutTypes'},
    section6: {title: 'Exercises', screen: 'ExerciseTypes'},
    section7: {title: 'FAQ', screen: 'FAQ'},
    section8: {title: 'My Profile', screen: 'MyProfile'},
  }

  renderRow(section, image) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={MainRowStyle.container} 
        key={section.title}
      >
        <View style={MainRowStyle.titleContainer}>
          <Text style={MainRowStyle.title}>
            <View style={{marginRight: 10}}>
              {image}
            </View>
            {section.title}
          </Text>
        </View>
        <View style={MainRowStyle.nextLevelContainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate(section.screen);}}>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  render() {
    const {
      section1, section2, section3, section4, section5, section6, section7, section8
    } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        {this.renderRow(section1, <Image source={require('../images/icons8-speed-24.png')} />)}
        {this.renderRow(section2)}
        {this.renderRow(section3)}
        {this.renderRow(section4)}
        {this.renderRow(section5, <Image source={require('../images/icons8-muscle-26.png')} />)}
        {this.renderRow(section6, <Image source={require('../images/icons8-punch-filled-26.png')} />)}
        {this.renderRow(section7, <Image source={require('../images/icons8-faq-26.png')} />)}
        {this.renderRow(section8, <Image source={require('../images/icons8-user-26.png')} />)}
      </View>
    );
  }
}


export default HomeScreen;

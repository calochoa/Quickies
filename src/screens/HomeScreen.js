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
        {this.renderRow(
          {title: 'Quickies', screen: 'Quickies', extra: {qBodySplit: 'qbs0000', qLevel: 'All'}}, 
          <Image source={require('../images/icons8-speed-24.png')} />
        )}
        {this.renderRow({title: 'Quickie of the Day', screen: 'QuickieOfTheDay'})}
        {this.renderRow({title: 'Workout of the Day', screen: 'WorkoutOfTheDay'})}
        {this.renderRow({title: 'Weekly Challenge', screen: 'WeeklyChallenge'})}
        {this.renderRow({title: 'Workouts', screen: 'WorkoutTypes'})}
        {this.renderRow({title: 'Exercises', screen: 'ExerciseTypes'})}
        {this.renderRow(
          {title: 'Favorite Quickies', screen: 'MultipleModesQuickies', extra: {quickieType: 'Favorite'}}, 
          <Image source={require('../images/icons8-star-26-gold.png')} />
        )}
      </View>
    );
  }
}


export default HomeScreen;

import React from 'react';
import { 
  Button, 
  View, 
  Text,
  TouchableOpacity, 
} from 'react-native';
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
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#fff"
        />
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Home',
    };
  };

  state = {
    section1: {title: 'Quickies', screen: 'QuickieTypes'},
    section2: {title: 'Quickie of the Day', screen: 'QuickieOfTheDay'},
    section3: {title: 'Workout of the Day', screen: 'QuickieTypes'},
    section4: {title: 'Weekly Challenge', screen: 'QuickieTypes'},
    section5: {title: 'Workouts', screen: 'WorkoutTypes'},
    section6: {title: 'Exercises', screen: 'ExerciseTypes'},
    section7: {title: 'FAQ', screen: 'FAQ'},
  }

  renderRow(section) {
    return (
      <View style={MainRowStyle.container} key={section.title}>
        <View style={MainRowStyle.titleContainer}>
          <Text style={MainRowStyle.title}>{section.title}</Text>
        </View>
        <View style={MainRowStyle.nextLevelContainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate(section.screen);}}>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      section1, section2, section3, section4, section5, section6, section7
    } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        {this.renderRow(section1)}
        {this.renderRow(section2)}
        {this.renderRow(section3)}
        {this.renderRow(section4)}
        {this.renderRow(section5)}
        {this.renderRow(section6)}
        {this.renderRow(section7)}
      </View>
    );
  }
}


export default HomeScreen;

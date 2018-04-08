import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MenuIcon from '../components/MenuIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import FaqStyle from '../style/FaqStyle';


class MyProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'My Profile',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          <LinearGradient 
            colors={['#4c669f', '#0276c9', '#192f6a']} 
            style={FaqStyle.container} 
          >
            <Text style={FaqStyle.question}>Quickie Stats</Text>
            <View style={FaqStyle.answerContainer}>
              <Text style={FaqStyle.answer}>A quickie a day keep the doctor away..</Text>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }
}


export default MyProfileScreen;

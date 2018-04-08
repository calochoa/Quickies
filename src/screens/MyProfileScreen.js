import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
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
        <ImageBackground
          style={{
            flex: 1,
            // remove width and height to override fixed static size
            width: null,
            height: null,
          }}
          source={require('../images/background.png')}
        />
      </View>
    );
  }
}


export default MyProfileScreen;

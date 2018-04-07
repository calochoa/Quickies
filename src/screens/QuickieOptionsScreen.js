import React from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MenuIcon from '../components/MenuIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import MainRowStyle from '../style/MainRowStyle';


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

  renderRow(section) {
    return (
      <LinearGradient 
        colors={['#4c669f', '#0276c9', '#192f6a']} 
        style={MainRowStyle.container} 
        key={section.title}
      >
        <View style={MainRowStyle.titleContainer}>
          <Text style={MainRowStyle.title}>{section.title}</Text>
        </View>
        <View style={MainRowStyle.nextLevelContainer}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate(section.screen);}}>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  renderRow(section, image) {
    return (
      <LinearGradient 
        colors={['#4c669f', '#0276c9', '#192f6a']} 
        style={MainRowStyle.container} 
        key={section.title}
      >
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
        {this.renderRow({title: 'All', screen: 'Quickies', extra: {quickieType: 'All'}})}
        {this.renderRow({title: 'by Level', screen: 'QuickieLevels'})}
        {this.renderRow({title: 'by Type', screen: 'QuickieTypes'})}
        {this.renderRow({title: 'by Muscle Group', screen: 'QuickieTypes'})}
        {this.renderRow(
          {title: 'Favorite', screen: 'QuickieTypes'}, 
          <Image source={require('../images/icons8-star-26-gold.png')} />
        )}
        {this.renderRow(
          {title: 'Completed', screen: 'QuickieTypes'}, 
          <Image source={require('../images/icons8-completed-26-green.png')} />
        )}
        {this.renderRow({title: 'Variations', screen: 'QuickieTypes'})}
      </View>
    );
  }
}


export default QuickieOptionsScreen;

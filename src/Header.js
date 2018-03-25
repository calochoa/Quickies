import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Image,
} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.nextLevelContainer} 
          onPress={() => this.props.navigator.pop()}
        >
          <Image source={require('./images/icons8-backward-25-white.png')} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
        </View>
        <TouchableOpacity 
          style={styles.nextLevelContainer} 
          onPress={() => this.props.navigator.pop()}
        >
        {
          <Image source={require('./images/icons8-menu-26.png')} />
        }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0276c9',
    padding: 10,
    paddingTop: 30,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 8,
  },
  nextLevelContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Cochin',
  },
});

export default Header;

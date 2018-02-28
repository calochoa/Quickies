import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
} from 'react-native';

class Footer extends Component {
  _goHome() {
    this.props.navigator.push({
      id: 'Home',
    });
  };

  _goQuickies() {
    this.props.navigator.push({
      id: 'Quickies',
    });
  };

  _goExercises() {
    this.props.navigator.push({
      id: 'Exercises',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.footer}>
          <Text onPress={this._goHome.bind(this)}>Home </Text>|
          <Text onPress={this._goQuickies.bind(this)}> Quickies </Text>|
          <Text onPress={this._goExercises.bind(this)}> Exercises</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0276c9',
    padding: 10,
    paddingBottom: 30,
  },
  footer: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Footer;

import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0276c9',
    padding: 10,
    paddingTop: 30,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Cochin',
  },
});

export default Header;

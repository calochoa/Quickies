import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  Image,
} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.row}>
        <View style={styles.backContainer}>
          <Image
            source={require('./images/icons8-backward-25-white.png')}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
        </View> 
        <View style={styles.infoContainer}>
          <Text style={styles.headerTitle}>?</Text>
        </View>
      </View>
    );
  {/*
      <View style={styles.row}>
        <View style={styles.backContainer}>
          <Image
            source={require('./images/icons8-backward-25-white.png')}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>{this.props.headerTitle}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.done}>Info?</Text>
        </View>
  */}
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#0276c9',
    flexDirection: 'row',
    alignItems: 'center', 
  },
  backContainer: {
    flex: 1,
    backgroundColor: '#0276c9',
    padding: 10,
    paddingTop: 30,
  },
  container: {
    flex: 5,
    backgroundColor: '#0276c9',
    padding: 10,
    paddingTop: 30,
  },
  infoContainer: {
    flex: 1,
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
  done: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});

export default Header;

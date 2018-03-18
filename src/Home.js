import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';

class Home extends Component {
  state = {
    header: {title: 'Home'},
    section1: {title: 'Quickies'},
    section2: {title: 'Quickie of the Day'},
    section3: {title: 'Workout of the Day'},
    section4: {title: 'Weekly Challenge'},
    section5: {title: 'Workouts'},
    section6: {title: 'Exercises'},
    section7: {title: 'FAQ'},
    //section10: {title: 'Videos'},
  }

  _onSelectSection(section) {
    this.props.navigator.push({
      id: section.title
    });
  }

  renderRow(section, index) {
    return (
      <View style={styles.row} key={index}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{section.title}</Text>
        </View>
        <View style={styles.nextLevelContainer}>
          <TouchableOpacity onPress={() => this._onSelectSection(section)} >
            <Image source={require('./images/icons8-forward-25-white.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      header, section1, section2, section3, section4, section5, section6, section7
    } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={header.title} />
        <View style={styles.innerContainer}>
          {this.renderRow(section1, 1)}
          {this.renderRow(section2, 2)}
          {this.renderRow(section3, 3)}
          {this.renderRow(section4, 4)}
          {this.renderRow(section5, 5)}
          {this.renderRow(section6, 6)}
          {this.renderRow(section7, 7)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  titleContainer: {
    flex: 8,
  },
  nextLevelContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#0276c9',
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});

export default Home;

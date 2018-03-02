import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableHighlight,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';

class Home extends Component {
  state = {
    header: {title: 'Home'},
    section1: {title: 'Quickies'},
    section2: {title: 'Workouts'},
    section3: {title: 'Exercises'},
    section4: {title: 'Quickie of the Day'},
    section5: {title: 'Videos'},
    section6: {title: 'FAQ'},
  }

  _onSelectSection(section) {
    this.props.navigator.push({
      id: section.title
    });
  }

  renderRow(section, index) {
    return (
      <TouchableHighlight
        onPress={() => this._onSelectSection(section)}
        style={styles.row} key={index}
      >
        <Text style={styles.title}>{section.title}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      header, section1, section2, section3, section4, section5, section6
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
        </View>
        <Footer navigator={this.props.navigator} />
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
  row: {
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
    color: '#f1f1f1',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});

export default Home;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableHighlight,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import ExerciseTypes from './dbstore/ExerciseTypes.json';

const { object } = PropTypes;

class ExercisesView extends Component {
  static propTypes = {
    navigator: object,
  }

  constructor(props) {
    super(props);

    let exerciseTypes = ExerciseTypes.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    let sectionTitles = []
    exerciseTypes.map(element => {
      sectionTitles.push(element.etName);
    });

    this.state = {
      sectionTitles: sectionTitles,
    };
  }

  _onSelectSection(sectionTitle) {
    this.props.navigator.push({
      id: 'ExercisesTemplate',
      name: sectionTitle
    });
  }

  renderRow(sectionTitle) {
    return (
      <TouchableHighlight
        onPress={() => this._onSelectSection(sectionTitle)}
        style={styles.row}
        key={sectionTitle}
      >
        <Text style={styles.title}>{sectionTitle}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    const { headerTitle } = this.props;
    const { sectionTitles } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} />
        <View style={styles.innerContainer}>
          {sectionTitles.map((sectionTitle) => this.renderRow(sectionTitle))}
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
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
});

export default ExercisesView;

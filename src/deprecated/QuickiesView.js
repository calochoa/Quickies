import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import QuickieTypes from './dbstore/QuickieTypes.json';

const { object } = PropTypes;

class QuickiesView extends Component {
  static propTypes = {
    navigator: object,
  }

  constructor(props) {
    super(props);

    let quickieTypes = QuickieTypes.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    let sectionTitles = []
    quickieTypes.map(element => {
      sectionTitles.push(element.qtName);
    });

    this.state = {
      sectionTitles: sectionTitles,
    };
  }

  _onSelectSection(sectionTitle) {
    this.props.navigator.push({
      id: 'QuickiesTemplate',
      name: sectionTitle
    });
  }

  renderRow(sectionTitle) {
    return (
      <View style={styles.row} key={sectionTitle}>
        <TouchableOpacity 
          style={styles.nextLevelContainer} 
          onPress={() => this._onSelectSection(sectionTitle)}
        >
          <Image source={require('./images/icons8-info-26.png')} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{sectionTitle}</Text>
        </View>
        <TouchableOpacity 
          style={styles.nextLevelContainer} 
          onPress={() => this._onSelectSection(sectionTitle)}
        >
          <Image source={require('./images/icons8-forward-25-white.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { headerTitle, navigator } = this.props;
    const { sectionTitles } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} navigator={navigator} />
        <View style={styles.innerContainer}>
          {sectionTitles.map((sectionTitle) => this.renderRow(sectionTitle))}
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

export default QuickiesView;

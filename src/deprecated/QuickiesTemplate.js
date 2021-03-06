import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Quickies from './dbstore/Quickies.json';
import QuickieTypes from './dbstore/QuickieTypes.json';
import Exercises from './dbstore/Exercises.json';
import Videos from './dbstore/Videos.json';

const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});
const QuickieTypesMap = new Map();
QuickieTypes.map(element => {
  QuickieTypesMap.set(element.qtName, element.qtId);
})
const VideosMap = new Map();
Videos.map(element => {
  VideosMap.set(element.vId, element.ytId);
})

class QuickiesTemplate extends Component {
  constructor(props) {
    super(props);

    let filteredData = []
    if (this.props.headerTitle === 'All') {
      filteredData = Quickies.sort((a,b) => {
        if (a.qName.toLowerCase() < b.qName.toLowerCase()) {
          return -1;
        }
        if (a.qName.toLowerCase() > b.qName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    } else {
      let quickieTypeId = QuickieTypesMap.get(this.props.headerTitle)
      Quickies.map(element => {
        if (element.qtId === quickieTypeId) {
          filteredData.push(element);
        }
      });
      filteredData = filteredData.sort((a,b) => {
        if (a.qDifficulty < b.qDifficulty) {
          return -1;
        }
        if (a.qDifficulty > b.qDifficulty) {
          return 1;
        }
        if (a.qName.toLowerCase() < b.qName.toLowerCase()) {
          return -1;
        }
        if (a.qName.toLowerCase() > b.qName.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }

    this.state = {
      headerTitle: this.props.headerTitle + ' Quickies (' + filteredData.length + ')',
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  getDifficultyImg = (quickie) => {
    let totalImages = quickie.qDifficulty
    let difficultyImg = []
    let numImages = []
    for (let i = 0; i < totalImages; i++) {
      numImages.push(<Image style={styles.imgContainer} source={require('./images/icons8-speed-24.png')} key={i} />)
      if ((i == 1 && totalImages < 6) || (i == 2 && totalImages == 6)) {
        difficultyImg.push(<View style={styles.imgRowContainer} key='1'>{numImages}</View>)
        numImages = []
      }
    }
    difficultyImg.push(<View style={styles.imgRowContainer} key='2'>{numImages}</View>)
    return difficultyImg
  }

  renderRow(quickie) {
    let jumpTo = () => {
      this.props.navigator.push({
        id: 'QuickieTemplate',
        qId: quickie.qId,
      });
    };

    return (
      <View style={styles.button} key={quickie.qId}>
        <Text style={styles.name}>{quickie.qName}</Text>
        <View style={styles.row}>
          <View style={styles.difficultyContainer}>
            {this.getDifficultyImg(quickie)}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
            <Text style={styles.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
            <Text style={styles.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
            <Text style={styles.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
          </View>
          <TouchableOpacity 
            style={styles.nextLevelContainer} 
            onPress={jumpTo}
          >
            <Image source={require('./images/icons8-forward-25-white.png')} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { navigator } = this.props;
    const { headerTitle, filteredData } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} navigator={navigator} />
        <View style={styles.innerContainer}>
          <ScrollView>
            {filteredData.map((quickie) => this.renderRow(quickie))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 15, 
    borderColor: '#4072b8',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  difficultyContainer: {
    flex: 4,
  },
  imgRowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  imgContainer: {
    margin: 3,
  },
  infoContainer: {
    width: 220,
  },
  nextLevelContainer: {
    flex: 1,
    marginRight: 5,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Cochin',
    marginBottom: 5,
  },
  info: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Cochin',
  },
});

export default QuickiesTemplate;

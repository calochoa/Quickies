import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ListView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from './Header';
import Quickies from './dbstore/Quickies.json';
import QuickieOfTheDayTypes from './dbstore/QuickieOfTheDayTypes.json';
import Exercises from './dbstore/Exercises.json';

const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});
const QuickieOfTheDayTypesMap = new Map();
QuickieOfTheDayTypes.map(element => {
  QuickieOfTheDayTypesMap.set(element.qotdId, element.qotdName.toUpperCase());
})

class QuickieOfTheDay extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    var date = new Date();
    var dayOfTheWeek = date.getDay();

    let filteredData = []
    Quickies.map(element => {
      if (('qotdId' in element) && (dayOfTheWeek == element.qotdOrder)) {
        filteredData.push(element);
      }
    });
    filteredData = filteredData.sort((a,b) => {
        if (a.qotdId < b.qotdId) {
          return -1;
        }
        if (a.qotdId > b.qotdId) {
          return 1;
        }
        return 0;
      });

    this.state = {
      dataSource: ds.cloneWithRows(filteredData),
      headerTitle: this.props.headerTitle,
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
      <View style={styles.button}>
        <View style={styles.quickieRow}>
          <Text style={styles.qotdType}>{QuickieOfTheDayTypesMap.get(quickie.qotdId)}</Text>
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
      </View>
    );
  }

  render() {
    const { headerTitle, dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} />
        <View style={styles.innerContainer}>
          <ListView 
            dataSource={dataSource}
            renderRow={this.renderRow.bind(this)} 
          />
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
  quickieRow: {
    flex: 1,
    alignItems: 'center', 
  },
  qotdType: {
    fontSize: 24,    
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Cochin',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  nameContainer: {
    flex: 3,
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

export default QuickieOfTheDay;

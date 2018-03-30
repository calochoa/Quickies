import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
  Image,
} from 'react-native';
import Quickies from '../dbstore/Quickies.json';
import QuickieTypes from '../dbstore/QuickieTypes.json';
import Exercises from '../dbstore/Exercises.json';
import Videos from '../dbstore/Videos.json';
import MenuIcon from '../components/MenuIcon';
import ForwardIcon from '../components/ForwardIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import QuickiesRowStyle from '../style/QuickiesRowStyle';


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

class QuickiesScreen extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.quickieType + ' Quickies' : 'Quickies',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    let filteredData = []
    if (params.quickieType === 'All') {
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
      let quickieTypeId = QuickieTypesMap.get(params.quickieType)
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
      filteredData: filteredData,
    };

    this.renderRow = this.renderRow.bind(this);
  }

  getDifficultyImg = (quickie) => {
    let totalImages = quickie.qDifficulty
    let difficultyImg = []
    let numImages = []
    for (let i = 0; i < totalImages; i++) {
      numImages.push(<Image style={QuickiesRowStyle.imgContainer} source={require('../images/icons8-speed-24.png')} key={i} />)
      if ((i == 1 && totalImages < 6) || (i == 2 && totalImages == 6)) {
        difficultyImg.push(<View style={QuickiesRowStyle.imgRowContainer} key='1'>{numImages}</View>)
        numImages = []
      }
    }
    difficultyImg.push(<View style={QuickiesRowStyle.imgRowContainer} key='2'>{numImages}</View>)
    return difficultyImg
  }

  renderRow(quickie) {
    return (
      <View style={QuickiesRowStyle.container} key={quickie.qId}>
        <Text style={QuickiesRowStyle.name}>{quickie.qName}</Text>
        <View style={QuickiesRowStyle.detailsContainer}>
          <View style={QuickiesRowStyle.difficultyContainer}>
            {this.getDifficultyImg(quickie)}
          </View>
          <View style={QuickiesRowStyle.infoContainer}>
            <Text style={QuickiesRowStyle.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
            <Text style={QuickiesRowStyle.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
            <Text style={QuickiesRowStyle.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
            <Text style={QuickiesRowStyle.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
          </View>
          <TouchableOpacity 
            style={QuickiesRowStyle.nextLevelContainer} 
            onPress={() => {
              this.props.navigation.navigate('Quickie', {
                quickieId: quickie.qId,
                quickieName: quickie.qName,
              });
            }}
          >
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { filteredData } = this.state;

    return (
      <View style={MainContainerStyle.container}>
        <ScrollView>
          {filteredData.map((quickie) => this.renderRow(quickie))}
        </ScrollView>
      </View>
    );
  }
}


export default QuickiesScreen;

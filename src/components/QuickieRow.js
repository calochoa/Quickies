import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  Image,
} from 'react-native';
import QuickieLevels from '../dbstore/QuickieLevels.json';
import Exercises from '../dbstore/Exercises.json';
import DifficultyIcon from '../components/DifficultyIcon';
import ForwardIcon from '../components/ForwardIcon';
import QuickieRowStyle from '../style/QuickieRowStyle';
import OverlayStyle from '../style/OverlayStyle';
import Overlay from 'react-native-modal-overlay';


const quickieLevelMap = new Map();
QuickieLevels.map(element => {
  quickieLevelMap.set(element.qlId, element);
})

const ExerciseMap = new Map();
Exercises.map(element => {
  ExerciseMap.set(element.eId, element.eName);
});


class QuickieRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quickie: this.props.quickie,
    };
  }

  setModalVisible(qName, visible) {
    const update = {}
    update[qName] = visible
    this.setState(update);
  }

  renderOverlay(qName, qDifficulty) {
    quickieLevel = quickieLevelMap.get('ql'+qDifficulty)
    return (
      <Overlay 
        visible={this.state[qName]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(qName, false);}}
      >
        <Text style={OverlayStyle.header}>{quickieLevel.qlName}</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{quickieLevel.qlDescription}</Text>
      </Overlay>
    )
  }

  _getDifficultyImg(totalImages) {
    let difficultyImg = []
    let numImages = []
    for (let i = 0; i < totalImages; i++) {
      numImages.push(<DifficultyIcon key={i}/>)
      if ((i == 1 && totalImages < 6) || (i == 2 && totalImages == 6)) {
        difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='1'>{numImages}</View>)
        numImages = []
      }
    }
    difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='2'>{numImages}</View>)
    return difficultyImg
  }

  render() {
    const { quickie } = this.state;

    return (
      <View style={QuickieRowStyle.subContainer}>
        {this.renderOverlay(quickie.qName, quickie.qDifficulty)}
        <View style={QuickieRowStyle.titleContainer}>
          <View style={{flex: 1,}}></View>
          <Text style={QuickieRowStyle.name}>{quickie.qName}</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5,}}>
            <Image source={require('../images/icons8-star-26-white.png')} />
          </View>
        </View>
        <View style={QuickieRowStyle.detailsContainer}>
          <TouchableOpacity 
            style={QuickieRowStyle.difficultyContainer}
            onPress={() => {this.setModalVisible(quickie.qName, true);}}
          >
            {this._getDifficultyImg(quickie.qDifficulty)}
          </TouchableOpacity>
          <View style={QuickieRowStyle.infoContainer}>
            <Text style={QuickieRowStyle.info}>{quickie.reps1} {ExerciseMap.get(quickie.eId1)}</Text>
            <Text style={QuickieRowStyle.info}>{quickie.reps2} {ExerciseMap.get(quickie.eId2)}</Text>
            <Text style={QuickieRowStyle.info}>{quickie.reps3} {ExerciseMap.get(quickie.eId3)}</Text>
            <Text style={QuickieRowStyle.info}>{quickie.reps4} {ExerciseMap.get(quickie.eId4)}</Text>
          </View>
          <TouchableOpacity 
            style={QuickieRowStyle.nextLevelContainer} 
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

}


export default QuickieRow;

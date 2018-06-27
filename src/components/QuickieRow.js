import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  Image,
} from 'react-native';
import QuickieLevels from '../dbstore/QuickieLevels.json';
import Exercises from '../dbstore/Exercises.json';
import QuickieModes from '../dbstore/QuickieModes.json';
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

const qvFactorMap = new Map();
QuickieModes.map(element => {
  qvFactorMap.set(element.qvName, element.qvFactor);
})


class QuickieRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quickie: this.props.quickie,
      qMode: this.props.qMode,
    };
  }

  setModalVisible(qName, visible) {
    const update = {}
    update[qName] = visible
    this.setState(update);
  }

  renderOverlay(qName, qDifficulty, qMode) {
    quickieLevel = quickieLevelMap.get(qMode + ' ' + qDifficulty)
    return (
      <Overlay 
        visible={this.state[qName]}
        closeOnTouchOutside={true}
        containerStyle={OverlayStyle.container}
        childrenWrapperStyle={OverlayStyle.wrapper}
        onClose={() => {this.setModalVisible(qName, false);}}
      >
        <Text style={OverlayStyle.header}>{qMode}{'\n'}{quickieLevel.qlName} Quickie</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{quickieLevel.qlDescription}</Text>
      </Overlay>
    )
  }

  getDifficultyImg(totalImages, qMode) {
    let difficultyImg = []
    let numImages = []
    for (let i = 0; i < totalImages; i++) {
      numImages.push(<DifficultyIcon qMode={qMode} key={i}/>)
      if ((i == 1 && totalImages < 6) || (i == 2 && totalImages == 6)) {
        difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='1'>{numImages}</View>)
        numImages = []
      }
    }
    difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='2'>{numImages}</View>)
    return difficultyImg
  }

  getFavoriteImg(quickie, qMode) {
    let favorite = quickie.qFavorite
    if (typeof qMode != 'undefined') {
      if (qMode === 'Blah Mode') {
        favorite = quickie.qFavorite_BlahMode
      } else if (qMode === 'Boss Mode') {
        favorite = quickie.qFavorite_BossMode
      } else if (qMode === 'Beast Mode') {
        favorite = quickie.qFavorite_BeastMode
      } else if (qMode === 'Bananas Mode') {
        favorite = quickie.qFavorite_BananasMode
      }
    }
    return favorite ? <Image style={{marginRight: 5,}} source={require('../images/icons8-star-26-gold.png')} />
      : <Image style={{marginRight: 5,}} source={require('../images/icons8-star-26-white.png')} />
  }

  getMedalImg() {
    return <Image source={require('../images/icons8-trophy-26-white.png')} />
  }

  getCompletedImg(quickie, qMode) {
    let completed = quickie.qCompleted
    if (typeof qMode != 'undefined') {
      if (qMode === 'Blah Mode') {
        completed = quickie.qCompleted_BlahMode
      } else if (qMode === 'Boss Mode') {
        completed = quickie.qCompleted_BossMode
      } else if (qMode === 'Beast Mode') {
        completed = quickie.qCompleted_BeastMode
      } else if (qMode === 'Bananas Mode') {
        completed = quickie.qCompleted_BananasMode
      }
    }
    return completed ? <Image source={require('../images/icons8-completed-26-green.png')} />
      : <Image source={require('../images/icons8-completed-26-white.png')} />
  }

  getRepExerciseRow(qvFactor, reps, exerciseId) {
    return (
      <Text style={QuickieRowStyle.info}>{Math.ceil(qvFactor * reps)} {ExerciseMap.get(exerciseId)}</Text>
    )
  }

  getExerciseInfo(quickie, qMode) {
    qvFactor = (typeof qMode != 'undefined') ? qvFactorMap.get(qMode) : 1
    return (
      <View style={QuickieRowStyle.infoContainer}>
        {this.getRepExerciseRow(qvFactor, quickie.reps1, quickie.eId1)}
        {this.getRepExerciseRow(qvFactor, quickie.reps2, quickie.eId2)}
        {this.getRepExerciseRow(qvFactor, quickie.reps3, quickie.eId3)}
        {this.getRepExerciseRow(qvFactor, quickie.reps4, quickie.eId4)}
      </View>
    )
  }

  getQuickieModeText(qMode) {
    return (typeof qMode != 'undefined' && qMode !== 'Standard') ? <Text style={QuickieRowStyle.variation}>{qMode}</Text> : null
  }

  render() {
    const { quickie, qMode } = this.state;

    return (
      <View style={QuickieRowStyle.subContainer}>
        {this.renderOverlay(quickie.qName, quickie.qDifficulty, qMode)}
        <View style={QuickieRowStyle.titleContainer}>
          <View style={{flex: 1, marginLeft: 5, flexDirection: 'row',}}>
            {this.getFavoriteImg(quickie, qMode)}
            {/* TODO: Add in 2nd release.. this.getMedalImg()*/}
          </View>
          <View style={QuickieRowStyle.nameContainer}>
            <Text style={QuickieRowStyle.name}>{quickie.qName}</Text>
            {this.getQuickieModeText(qMode)}
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5,}}>
            {this.getCompletedImg(quickie, qMode)}
          </View>
        </View>
        <View style={QuickieRowStyle.detailsContainer}>
          <TouchableOpacity 
            style={QuickieRowStyle.difficultyContainer}
            onPress={() => {this.setModalVisible(quickie.qName, true);}}
          >
            {this.getDifficultyImg(quickie.qDifficulty, qMode)}
          </TouchableOpacity>
          {this.getExerciseInfo(quickie, qMode)}
          <TouchableOpacity 
            style={QuickieRowStyle.nextLevelContainer} 
            onPress={() => {
              this.props.navigation.navigate('Quickie', {
                quickieId: quickie.qId,
                quickieName: quickie.qName,
                qMode: qMode,
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

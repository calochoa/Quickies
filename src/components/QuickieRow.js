import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  Image,
} from 'react-native';
import QuickieLevels from '../dbstore/QuickieLevels.json';
import Exercises from '../dbstore/Exercises.json';
import QuickieVariations from '../dbstore/QuickieVariations.json';
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
QuickieVariations.map(element => {
  qvFactorMap.set(element.qvName, element.qvFactor);
})


class QuickieRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quickie: this.props.quickie,
      qVariation: this.props.qVariation,
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
        <Text style={OverlayStyle.header}>{quickieLevel.qlName} Quickie</Text>
        <View style={OverlayStyle.divider}/>
        <Text style={OverlayStyle.text}>{quickieLevel.qlDescription}</Text>
      </Overlay>
    )
  }

  getDifficultyImg(totalImages, qVariation) {
    let difficultyImg = []
    let numImages = []
    for (let i = 0; i < totalImages; i++) {
      numImages.push(<DifficultyIcon qVariation={qVariation} key={i}/>)
      if ((i == 1 && totalImages < 6) || (i == 2 && totalImages == 6)) {
        difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='1'>{numImages}</View>)
        numImages = []
      }
    }
    difficultyImg.push(<View style={QuickieRowStyle.imgRowContainer} key='2'>{numImages}</View>)
    return difficultyImg
  }

  getFavoriteImg(quickie) {
    return (quickie.qFavorite) ? <Image source={require('../images/icons8-star-26-gold.png')} />
      : <Image source={require('../images/icons8-star-26-white.png')} />
  }

  getCompletedImg(quickie) {
    return (quickie.qCompleted) ? <Image source={require('../images/icons8-completed-26-green.png')} />
      : <Image source={require('../images/icons8-completed-26-white.png')} />
  }

  getRepExerciseRow(qvFactor, reps, exerciseId) {
    return (
      <Text style={QuickieRowStyle.info}>{Math.ceil(qvFactor * reps)} {ExerciseMap.get(exerciseId)}</Text>
    )
  }

  getExerciseInfo(quickie, qVariation) {
    qvFactor = (typeof qVariation != 'undefined') ? qvFactorMap.get(qVariation) : 1
    return (
      <View style={QuickieRowStyle.infoContainer}>
        {this.getRepExerciseRow(qvFactor, quickie.reps1, quickie.eId1)}
        {this.getRepExerciseRow(qvFactor, quickie.reps2, quickie.eId2)}
        {this.getRepExerciseRow(qvFactor, quickie.reps3, quickie.eId3)}
        {this.getRepExerciseRow(qvFactor, quickie.reps4, quickie.eId4)}
      </View>
    )
  }

  getQuickieVariationText(qVariation) {
    return (typeof qVariation != 'undefined') ? <Text style={QuickieRowStyle.variation}>{qVariation}</Text> : null
  }

  render() {
    const { quickie, qVariation } = this.state;

    return (
      <View style={QuickieRowStyle.subContainer}>
        {this.renderOverlay(quickie.qName, quickie.qDifficulty)}
        <View style={QuickieRowStyle.titleContainer}>
          <View style={{flex: 1, marginLeft: 5,}}>
            {this.getFavoriteImg(quickie)}
          </View>
          <View style={QuickieRowStyle.nameContainer}>
            <Text style={QuickieRowStyle.name}>{quickie.qName}</Text>
            {this.getQuickieVariationText(qVariation)}
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 5,}}>
            {this.getCompletedImg(quickie)}
          </View>
        </View>
        <View style={QuickieRowStyle.detailsContainer}>
          <TouchableOpacity 
            style={QuickieRowStyle.difficultyContainer}
            onPress={() => {this.setModalVisible(quickie.qName, true);}}
          >
            {this.getDifficultyImg(quickie.qDifficulty, qVariation)}
          </TouchableOpacity>
          {this.getExerciseInfo(quickie, qVariation)}
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

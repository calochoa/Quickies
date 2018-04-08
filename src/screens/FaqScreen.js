import React, { Component } from 'react';
import {
  TouchableOpacity,
  View, 
  Text, 
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getGradientColor} from '../utils/GradientColor';
import FaqInfo from '../dbstore/Faq.json';
import MenuIcon from '../components/MenuIcon';
import MainContainerStyle from '../style/MainContainerStyle';
import FaqStyle from '../style/FaqStyle';


class FaqScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      title: 'FAQ',
      headerBackTitle: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerToggle')} >
          <MenuIcon />
        </TouchableOpacity>
      ),
      drawerLabel: 'Frequently Asked Questions',
    };
  };

  constructor(props) {
    super(props);

    let sortedData = []
    sortedData = FaqInfo.sort((a,b) => {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    this.state = {
      dataSource: sortedData,
    };
  }

  renderRow(faq) {
    return (
      <LinearGradient 
        colors={getGradientColor('default')} 
        style={FaqStyle.container} 
        key={faq.order}
      >
        <Text style={FaqStyle.question}>{faq.question}</Text>
        <View style={FaqStyle.answerContainer}>
          <Text style={FaqStyle.answer}>{faq.answer}</Text>
        </View>
      </LinearGradient>
    );
  }

  render() {
    const { dataSource } = this.state;

    return (
      <View style={MainContainerStyle.container}>
          <ScrollView>
            {dataSource.map((faq) => this.renderRow(faq))}
          </ScrollView>
      </View>
    );
  }
}


export default FaqScreen;

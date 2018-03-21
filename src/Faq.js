import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
} from 'react-native';
import Header from './Header';
import FaqInfo from './dbstore/Faq.json';

class FAQ extends Component {
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
      headerTitle: this.props.headerTitle,
    };
  }

  renderRow(faq) {
    return (
      <View style={styles.faqRow} key={faq.order}>
        <Text style={styles.question}>{faq.question}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { navigator } = this.props;
    const { headerTitle, dataSource } = this.state;

    return (
      <View style={styles.container}>
        <Header headerTitle={headerTitle} navigator={navigator} />
        <View style={styles.innerContainer}>
          <ScrollView>
            {dataSource.map((faq) => this.renderRow(faq))}
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
  faqRow: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#0276c9',
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    borderColor: '#4072b8',
  },
  question: {
    fontSize: 24,    
    color: '#fff',
    marginBottom: 5,
    fontFamily: 'Cochin',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 2,
    marginLeft: 10,
  },
  answer: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Cochin',
  },
});

export default FAQ;

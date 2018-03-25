import React, { Component } from 'react';
import {
  StyleSheet, 
  WebView,
} from 'react-native';


class Video extends Component {
  render() {
  	return (
	  <WebView
        style={styles.container}
        javaScriptEnabled={true}
        source={{uri: 'https://youtu.be/' + this.props.ytId}} />
  	);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Video
import React, { Component } from 'react';
import {
  StyleSheet, 
  View, 
  Text,
  TextInput, 
} from 'react-native';

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable = {true}
        maxLength = {40} />
    );
  }
}

class UselessTextInputMultiline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Multiline Placeholder',
    };
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
     <View style={{
       backgroundColor: this.state.text,
       borderBottomColor: '#000000',
       borderBottomWidth: 1 }}
     >
       <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text} />
     </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0276c9',
    padding: 10,
    paddingBottom: 30,
  },
  footer: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default UselessTextInputMultiline;
